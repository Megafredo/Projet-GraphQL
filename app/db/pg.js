//~ Logger
import debug from 'debug';
const logger = debug('SQL:log');

// L'utilisation d'un pool permet de faire des connexions simultanées
// Le Pool va générer des instances Client et sa fonctionnalité permet 
// lors d'une requête de crée automatiquement une connexion à la BDD
// ainsi que la déconnexion après la requête !


import pg from 'pg';
const pool = new pg.Pool();

let queryCount = 0;

const client = {
  // On expose quand même le client original "au cas ou"
  originalClient: pool,

  // On fait une méthode pour "intercepter"
  // les requêtes afin de pouvoir les afficher
  // L'opérateur de "rest" permet de transformer
  // ici X variables en param. en un tableau
  async query(...params) {
    // debug(...params);
    queryCount += 1;
    logger(`Req n°${queryCount}`);

    // L'opérateur ici fait l'effet inverse on transforme
    // un tableau en une liste
    // de variables / paramétre ce qui fait que la méthode query du client sera
    // appelé exactement de la même façon que celle de notre module
    return this.originalClient.query(...params);
  }
};

export { client };