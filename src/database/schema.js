const graphql = require('graphql');

const {
  GraphQLObjectType,
  GraphQLSchema,
  GraphQLInt,
  GraphQLString,
  GraphQLList,
  GraphQLFloat,
} = graphql;
const fetch = require('node-fetch');

const testToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6Im1hcmsuc0BvdXJfY29tcGFueS5jb20iLCJwYXNzd29yZCI6Im1hcmt0aGVhZG1pbjQiLCJpYXQiOjE1NDM0MDY0NDZ9.fyJO2wkBnIbYAJwSYaDpq4lVvCUyZMQcvugdvb3Fuiw';

const ProductType = new GraphQLObjectType({
  name: 'Product',
  description: 'Product',
  fields: {
    id: { type: GraphQLString },
    imgUrl: { type: GraphQLString },
    type: { type: GraphQLString },
    name: { type: GraphQLString },
    price: { type: GraphQLString },
    inStock: { type: GraphQLInt },
  },
});

const OrdersType = new GraphQLObjectType({
  name: 'Orders',
  description: 'orders',
  fields: {
    id: { type: GraphQLString },
    userId: { type: GraphQLString },
    person: { type: GraphQLString },
    date: { type: GraphQLString },
    companyId: { type: GraphQLString },
    totalPrice: { type: GraphQLFloat },
  },
});

const RootQuery = new GraphQLObjectType({
  name: 'RootQueryType',
  fields: {
    products: {
      type: new GraphQLList(ProductType),
      args: {},
      async resolve() {
        const products = await fetch('http://127.0.0.1:3004/products', {
          method: 'get',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${testToken}`,
          },
        });
        return products.json();
      },
    },
    orders: {
      type: new GraphQLList(OrdersType),
      args: {},
      async resolve() {
        const products = await fetch('http://127.0.0.1:3004/orders?id=user-4', {
          method: 'get',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${testToken}`,
          },
        });
        return products.json();
      },
    },
  },
});

module.exports = new GraphQLSchema({
  query: RootQuery,
});
