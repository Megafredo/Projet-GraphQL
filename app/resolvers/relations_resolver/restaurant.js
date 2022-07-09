//~relations

    //& dans le cas ou on utilise la requete via la BDD
    // getAllRestaurants{ --> parent.city_id (on récupère le city_id de restaurants)
    //     city{} --> est la méthode lié a restaurants (car on appel la méthode getAllRestaurants)

    //& Dans le cas ou on utlise la requete via le DataSource
    // on passe directement dans datasources
    // on optimise les requetes a l'aide de DataLoader et ou du query builder (Knex)


const Restaurant = {

    //* Dans le schema "restaurant" on retrouve bien
    //* les relations : city, manager et cookingStyles
    //* qui sont les clés étrangeres de restaurants

    city(parent, _, { dataSources }) {
      return dataSources.orestoDB.cities.findByPk(parent.city_id);
    },
  
    manager(parent, _, { dataSources }) {
      return dataSources.orestoDB.managers.findByPk(parent.manager_id);
    },
  
    //! many to many with cooking style => schema
    cookingStyles(parent, _, { dataSources }) {
      return dataSources.orestoDB.cookingStyles.findByRestaurant(parent.id);
    }
  };
  
  export { Restaurant };