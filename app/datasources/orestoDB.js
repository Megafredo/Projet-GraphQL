import { SQLDataSource } from 'datasource-sql';
import { RestaurantDataMapper } from '../datamappers/restaurant.js';
import { ManagerDataMapper } from '../datamappers/manager.js';
import { CityDataMapper } from '../datamappers/city.js';
import { CookingStyleDataMapper } from '../datamappers/cookingStyle.js';

// SQLDataSource ne s'occupe que des appels à la base de données
// RESTDataSource ne s'occupe que des appels à l'API
class RestoDB extends SQLDataSource {
    constructor(config) {
        //super = constructor du parent
        super(config);

        // config:  {
        //     client: 'pg',
        //     connection: {
        //       host: 'localhost',
        //       port: '5432',
        //       user: 'postgres',
        //       password: 'oresto',
        //       database: 'oresto'
        //     }
        //   }

        //& C'est ici dans datasource qu'on va mettre en place notre dataloader
        // d'ou l'utilisation de config dans le constructor
        // config concerne le lien vers la base de données
        //on va créer un intermédiaire au sein de chaque datamapper
        // Pour le mettre en place on va crée des loaders
        
        this.restaurants = RestaurantDataMapper;
        this.managers = ManagerDataMapper;
        this.cities = CityDataMapper;
        this.cookingStyles = CookingStyleDataMapper;
    }

    //pour chaque datasource son propre loader pour optimiser les requêtes
    createLoaders() {
        this.restaurants.createLoader();
        // this.managers.createLoader();
        // this.cities.createLoader();
        // this.cookingStyles.createLoader();
    }
}

export { RestoDB };
