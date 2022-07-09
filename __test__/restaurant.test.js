// https://katalon.com/resources-center/blog/api-testing-tips

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