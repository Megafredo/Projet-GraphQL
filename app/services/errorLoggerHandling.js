// Journalisation logger
//~import modules
import { formattedDate } from "../utils/formattedDate.js";

//~resolve __dirname
import path from "path";

import * as fs from 'fs';
import {fileURLToPath} from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

//~ Logger
import debug from 'debug';
const logger = debug('ErrorHandling');

logger('-------------------- ERROR LOGGER HANDLING --------------------');

const errorHandling = {
    /**
     * Manage error
     */

    manage(err, req, res) { 
        logger("Manage", err.message);
        // Enregistrer l'erreur dans des logs

        const actualDate = new Date();

        // formatage du message ( Heure + informations de l'erreur) 
        const logMessage = `${actualDate.toLocaleString()} - ${req.url} - ${err.message}\r`;
        logger("Message du log", logMessage);

        // format date du fichier de log (Année-Mois-Jour)
        const fileName = `${formattedDate}.log`;
        logger("Nom du fichier de log", fileName);

        // ajout d'une ligne au fichier de log (création de celui-ci s'il n'existe pas)
        fs.appendFile(path.join(__dirname, `../../logs/${fileName}`), logMessage, (error) => {
            if (error) logger(error);
        });
        logger(logMessage)
        logger('----------------------------------------');
    }

    
};

export { errorHandling };