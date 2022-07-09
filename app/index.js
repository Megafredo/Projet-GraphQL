

//~ ------------------ IMPORT INDEX SCHEMA
import { schemas } from './schemas/index.js';
const typeDefs = schemas;

//~ ------------------ IMPORT INDEX RESOLVERS
import * as resolvers from './resolvers/index.js';

//? Gestion d'un dossier public
// const path = require("path");
// const express = require("express");
// const app = express();
// app.use(express.static(path.join(__dirname,'../public')));

//~ ------------------ DATASOURCES
import {RestoDB} from './datasources/orestoDB.js';
import {WeatherAPI} from './datasources/other_API_DB/weatherAPI.js';

const orestoDB = new RestoDB({
    client:'pg',
    connection: {
        host:process.env.PGHOST ?? 'localhost',
        port:process.env.PGPORT ?? 5432,
        user:process.env.PGUSER ?? 'oresto',
        password:process.env.PGPASSWORD ?? 'oresto' ,
        database:process.env.PGDATABASE ?? 'oresto'
    }
});

const apolloConfig = {
    typeDefs,
    resolvers,
    dataSources: () => ({
      //instance de RestoDB
      orestoDB,
      //csrfPrevention: true,
      //instance of our API third party
      weatherAPI: new WeatherAPI()
    }),
    plugins: [
        {
          //create loader to increase performance
        async requestDidStart() {
          orestoDB.createLoaders();
        }
      }
    ]
  };
  
export { apolloConfig };


// Sécurité (Cette option sert a prévenir des attaques CSRF)
// csrfPrevention: true

// Passing true enables Apollo Server's CSRF and XS-Search prevention features. This flag is highly recommended for all users and will be enabled by default in Apollo Server 4. Enabling this feature prevents certain GET requests from executing GraphQL operations. If your server has clients that send GET requests and those clients are not one of Apollo Client Web, Apollo iOS, or Apollo Kotlin, you might need to modify the configuration of those clients before enabling this feature. For more details, see the full CSRF prevention documentation.


