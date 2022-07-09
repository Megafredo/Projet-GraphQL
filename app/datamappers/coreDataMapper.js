class CoreDataMapper {
    tableName;

    constructor(client) {
        this.client = client;
    }

    /**
     * Récupération par identifiant
     * @param {number|number[]} id identifiant ou liste d'identifiants
     * @returns un enregistrement ou une liste d'enregistrement
     */
    async findByPk(id) {
        const preparedQuery = {
            text: `SELECT * FROM "${this.tableName}" WHERE id = $1;`,
            values: [id],
        };

        const result = await this.client.query(preparedQuery);

        if (!result.rows[0]) {
            return null;
        }

        return result.rows[0];
    }

    //! Attention cette forme d'automatisation est employer avec et pour GraphQL
    async findAll(params) {
        let filter = '';
        const values = [];

        //? optional chaining
        // Si $where n'existe pas alors on renvoi undefined au lieu d'une erreur
        // Ce $where est le nom de notre objet dans le resolver
        if (params?.$where) {
            const filters = [];
            let indexPlaceholder = 1;

            Object.entries(params.$where).forEach(([param, value]) => {
                if (param === '$or') {
                    const filtersOr = [];
                    Object.entries(value).forEach(([key, val]) => {
                        filtersOr.push(`"${key}" = $${indexPlaceholder}`);
                        values.push(val);
                        indexPlaceholder += 1;
                    });
                    filters.push(`(${filtersOr.join(' OR ')})`);
                } else {
                    filters.push(`"${param}" = $${indexPlaceholder}`);
                    values.push(value);
                    indexPlaceholder += 1;
                }
            });
            filter = `WHERE ${filters.join(' AND ')}`;
        }

        const preparedQuery = {
            text: `
                SELECT * FROM "${this.tableName}"
                ${filter};
            `,
            values,
        };

        const result = await this.client.query(preparedQuery);

        return result.rows;
    }

    async create(inputData) {
        const fields = [];
        const placeholders = [];
        const values = [];
        let indexPlaceholder = 1;

        Object.entries(inputData).forEach(([prop, value]) => {
            fields.push(`"${prop}"`);
            placeholders.push(`$${indexPlaceholder}`);
            indexPlaceholder += 1;
            values.push(value);
        });

        const preparedQuery = {
            text: `
                INSERT INTO "${this.constructor.tableName}"
                (${fields})
                VALUES (${placeholders})
                RETURNING *;
            `,
            values,
        };

        const result = await this.constructor.client.query(preparedQuery);
        const row = result.rows[0];

        return row;
    }

    async update({ id }, inputData) {
        const fieldsAndPlaceholders = [];
        let indexPlaceholder = 1;
        const values = [];

        Object.entries(inputData).forEach(([prop, value]) => {
            fieldsAndPlaceholders.push(`"${prop}" = $${indexPlaceholder}`);
            indexPlaceholder += 1;
            values.push(value);
        });

        values.push(id);

        const preparedQuery = {
            text: `
                UPDATE "${this.constructor.tableName}" SET
                ${fieldsAndPlaceholders},
                updated_at = now()
                WHERE id = $${indexPlaceholder}
                RETURNING *;
            `,
            values,
        };

        const result = await this.constructor.client.query(preparedQuery);
        const row = result.rows[0];

        return row;
    }

    async delete(id) {
        await this.constructor.client.query(`DELETE FROM "${this.constructor.tableName}" WHERE id = $1;`, [id]);
    }
}

export { CoreDataMapper };
