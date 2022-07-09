//? Gestion des caches
// on intéroge dataSources en premier
// s'il n'existe pas on lance la base de données
// s'il existe on récupère les infos dans DataSources

// SANS DATASOURCES
//? Méthode 0 Standard
// getManager(parent, args, context, info){
//     return managerDataMapper.findByPk( args.id );
// },

//? Méthode 1 Destructuring
// getRestaurant(parent, args, context, info){
//     const { id } = args;
//     return restaurantDataMapper.findByPk( id );
// },


//? Méthode 3 Destructuring directement dans les parametres
// getManager(parent, {id}, context, info){
//     return managerDataMapper.findByPk( id );
// },

// //!!!!! Mauvaise Méthode --> retourne undefined
// getRestaurant( id ){
//     return restaurantDataMapper.findByPk( id );
// },

// https://blog.ineat-group.com/2019/11/agreger-vos-reponses-dapi-avec-graphql/
//? Un resolver contient 4 arguments : 
// parent: Un objet qui contient les résultats retournés par un resolver sur le parent. Nous y reviendrons dans la suite du tutoriel
// args: Les arguments passés au champ
// context: Un objet qui est partagé entre tous les resolvers
// info: Information concernant l’état d’exécution de l’opération
// Pour éviter d’avoir { dataSources }: any, déclarez une interface GlobalContext qui va définir les datasources.



const Query = {
    //& ---------------------------------- RESTAURANT
    getAllRestaurants(parent, args, { dataSources }, info) {
      return dataSources.orestoDB.restaurants.findAll();
    },
    // source :https://www.apollographql.com/blog/graphql/filtering/how-to-search-and-filter-results-with-graphql/
    getRestaurant(parent, { id }, { dataSources }, info) {
      return dataSources.orestoDB.restaurants.findByPk(id);
    },
  
    getRestaurantByCookingStyle(parent, { label }, { dataSources }, info) {
      return dataSources.orestoDB.restaurants.findByCookingStyle(label);
    },
  

    //& ---------------------------------- MANAGER
    getAllManagers(parent, { id }, { dataSources }, info) {
      return dataSources.orestoDB.managers.findAll();
    },
    getManager(parent, { id }, { dataSources }, info) {
      return dataSources.orestoDB.managers.findByPk(id);
    },
  

    //& ---------------------------------- CITY
    getAllCities(parent, args, { dataSources }, info) {
      return dataSources.orestoDB.cities.findAll();
    },
    getCity(parent, { id }, { dataSources }, info) {
      return dataSources.orestoDB.cities.findByPk(id);
    },
  

    //& ---------------------------------- COOKING STYLE
    getCookingStyles(parent, { id }, { dataSources }, info) {
      return dataSources.orestoDB.cookingStyles.findAll();
    },
  
    getStyleByName(parent, { label }, { dataSources }, info) {
      return dataSources.orestoDB.cookingStyles.findByName(label);
    }


  };
  
  export { Query };


