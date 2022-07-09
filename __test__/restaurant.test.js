// https://katalon.com/resources-center/blog/api-testing-tips

//~ -------------------- IMPORTATIONS
// import * as index from '../app/resolvers';

// it('fetches single launch', async () => {
//   const userAPI = new UserAPI({ store });
//   const launchAPI = new LaunchAPI();

//   // create a test server to test against, using our production typeDefs,
//   // resolvers, and dataSources.
//   const server = new ApolloServer({
//     typeDefs,
//     resolvers,
//     dataSources: () => ({ userAPI, launchAPI }),
//     context: () => ({ user: { id: 1, email: 'a@a.a' } }),
//   });

//   // mock the dataSource's underlying fetch methods
//   launchAPI.get = jest.fn(() => [mockLaunchResponse]);
//   userAPI.store = mockStore;
//   userAPI.store.trips.findAll.mockReturnValueOnce([
//     { dataValues: { launchId: 1 } },
//   ]);

//   // run the query against the server and snapshot the output
//   const res = await server.executeOperation({ query: GET_LAUNCH, variables: { id: 1 } });
//   expect(res).toMatchSnapshot();
// });

// const getallrestaurant = `
//     query getAllRestaurants {
//         getAllRestaurants {
//             name
//             description
//             cookingStyles {
//                 label
//             }
//         }
//     }
// `;

// //~import modules
// import { ApolloServer } from 'apollo-server-express';

// console.log('----------------------------',server.config.dataSources().orestoDB.restaurants)

// it('returns hello with the provided name', async () => {
//   const result = await server.config.resolvers.Query.getAllRestaurants().executeOperation({
//       query: `
//      query getAllRestaurants {
//         getAllRestaurants {
//             name
//             description
//             cookingStyles {
//                 label
//             }
//         }
//   `,
//     // variables: { name: 'world' },
//   });

// //   expect(result.errors).toBeUndefined();

//   // Result = Received: {"data": undefined, "errors": [[SyntaxError: Syntax Error: Expected Name, found <EOF>.]], "extensions": undefined, "http": {"headers": {Symbol(map): {}}}}

// //   expect(result.data?.hello).toBe('Hello world!');
// });




//~ ----------------------------------------------------------------------------
//~ ----------------------------------------------------------------------------

//~import schema and resolvers with config
// import { apolloConfig } from '../app/index.js';
// const server = new ApolloServer(apolloConfig);

// //~ ---------------- IMPORT MODULE
// import { gql } from 'apollo-server-express'
// import { ApolloServer } from 'apollo-server-express';

// const typeDefs = gql`
//     type Query {
//         hello(name: String): String!
//     }
// `;

// const resolvers = {
//     Query: {
//       hello: (_, { name }) => `Hello ${name}!`,
//     },
//   };

//   it('returns hello with the provided name', async () => {
//     const server = new ApolloServer({
//       typeDefs,
//       resolvers
//     });

//     const result = await server.executeOperation({
//         query: 'query SayHelloWorld($name: String) { hello(name: $name) }',
//         variables: { name: 'world' },
//       });
    
//       expect(result.errors).toBeUndefined();
//       expect(result.data?.hello).toBe('Hello world!');
// });

//~ ----------------------------------------------------------------------------
//~ ----------------------------------------------------------------------------




//~import modules
import { ApolloServer } from 'apollo-server-express';

//~import schema and resolvers with config
import { apolloConfig } from '../app/index.js';
const server = new ApolloServer(apolloConfig);

const query = `
query GetAllRestaurantByCity {
    getCity(id: 193){
        id
        name
        restaurants{
            id
            name
        }
    }
}
`;

const variable = { "id": 1 }

it('test', async () => {
  const result = await server.executeOperation({ query });
  console.log("result: ", result);
  expect(result.data).toBeInstanceOf(Object);
  console.log("result.data: ", result.data);
    // expect(result.data).toBe();
});