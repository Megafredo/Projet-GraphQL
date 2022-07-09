//~ ---------------- IMPORT MODULE
import { gql } from 'apollo-server-express'

//~ ---------------- path / readFileSync / __dirname
import { readFileSync } from 'fs';
const __dirname = "./app/schemas/"

//~ ----------------
//? On doit utiliser readFileSync car l'import ES6 ou COMMONJS ne fonctionnent pas avec le format .gql
//? On obtient ce genre d'erreur : TypeError [ERR_UNKNOWN_FILE_EXTENSION]: Unknown file extension ".gql"
//~ ----------------
const restaurant = readFileSync(`${__dirname}tables_schema/restaurant.gql`);
const city = readFileSync(`${__dirname}tables_schema/city.gql`);
const manager = readFileSync(`${__dirname}tables_schema/manager.gql`);
const cookingStyle = readFileSync(`${__dirname}tables_schema/cookingStyle.gql`);
const weather = readFileSync(`${__dirname}other_API_schema/weather.gql`);
const scalars = readFileSync(`${__dirname}scalars.gql`);
const query = readFileSync(`${__dirname}query.gql`);


const schemas = gql`

    ${scalars}
    
    ${restaurant}
    ${cookingStyle}
    ${city}
    ${manager}
    ${weather}

    ${query}
`;

export { schemas };