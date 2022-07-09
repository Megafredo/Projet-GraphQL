//~ ---------- VARIABLES D'ENVIRONNEMENT
import 'dotenv/config';

// ----------- COMMONJS
// const { createServer } = require("http");
// const { ApolloServer } = require("apollo-server-express");
// const debug = require('debug')('app:server');
// const { app,apolloConfig } = require("./app");

// import { errorHandling } from './app/services/errorLoggerHandling.js';
// errorHandling.manage({message: "myError"},{url: '/test/api'})


//~ ---------- IMPORTATION APPOLOSERVER (GraphQL)
import { ApolloServer } from 'apollo-server-express';

//~ ---------- EXPRESS
import express from 'express';
const app = express();

//~ ---------- LOGGER
import debug from 'debug';
const logger = debug('EntryPoint');
logger('-------------------- Lancement du server -------------------- ')
//~ ---------- 

//~ ---------- IMPORTATION SCHEMA AND RESOLVERS WITH CONFIG
import { apolloConfig } from './app/index.js';
const server = new ApolloServer(apolloConfig);

//~ ---------- PORT
const PORT = process.env.PORT ?? 3000;


//~ ---------- START APOLLO SERVER
async function startServer() {
    //Start instance Apollo Server
      await server.start();
    // Link Express with Apollo server
      server.applyMiddleware({app});
    
        await app.listen(PORT);
        logger(`🚀 Server launched on http://localhost:${PORT}`);
        logger('------------------------------------------------------------- ')
    };
    
    startServer();

