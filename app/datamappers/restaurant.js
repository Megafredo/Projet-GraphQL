//~import modules
import { CoreDataMapper } from './coreDataMapper.js';
import { client } from '../db/pg.js';
import DataLoader from 'dataloader';

class Restaurant extends CoreDataMapper {
  tableName = 'restaurant';

  async findByManager(managerId) {
    const preparedQuery = {
      text: `
                SELECT *
                FROM "${this.tableName}"
                WHERE "manager_id" = $1`,
      values: [managerId]
    };

    const result = await this.client.query(preparedQuery);

    return result.rows;
  }

  async findByCity(cityId) {
    const preparedQuery = {
      text: `
                SELECT *
                FROM "${this.tableName}"
                WHERE "city_id" = $1`,
      values: [cityId]
    };

    const result = await this.client.query(preparedQuery);

    return result.rows;
  }

  async findByCookingStyle(label) {
    // source :https://stackoverflow.com/questions/3395339/sql-how-do-i-query-a-many-to-many-relationship
    const preparedQuery = {
      text: `
            SELECT DISTINCT CS.label, R.name
            FROM "cooking_style" AS CS
            JOIN "restaurant_has_cooking_style" as RCS ON CS.id = RCS.restaurant_id
            JOIN "${this.tableName}" AS R ON RCS.cooking_style_id = R.id
            WHERE CS.label = $1;`,
      values: [label]
    };

    const result = await this.client.query(preparedQuery);

    return result.rows;
  }

  // ApolloServer nous apporte des fonctionnalités en plus dont l'utilisation de datasource et dataloader pour optimisés les requêtes
  // express est la pour simplifié nodeJs (on peut aussi utiliser apolloServer juste pour ca fonctionnalité de datasource)

  // Méthode lié au dataLoader
  async createLoader() {
    // super.createLoader();
    //mise en place d'une jointure

    // Tableau d'id car pour tous les restaurant, on veut la ville
    // ids => tableau d'id, s'il en trouve un ou plusieurs, il le renvoie
    this.cityIdLoader = new DataLoader(async ids => {
    
      // On réutilise une méthode existante
      const records = await this.findByCity(ids);

      // on attend un retour de tableau
      const result = ids.map(id => records.filter(record => record.id == id));
      return result;
    });
  }
}

const RestaurantDataMapper = new Restaurant(client);
export { RestaurantDataMapper };
