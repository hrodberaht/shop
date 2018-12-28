const graphql = require('graphql');

const {
  GraphQLObjectType,
  GraphQLSchema,
  GraphQLInt,
  GraphQLString,
  GraphQLList,
  GraphQLFloat,
  GraphQLBoolean,
} = graphql;
const fetch = require('node-fetch');

const ProductType = new GraphQLObjectType({
  name: 'Product',
  description: 'Product',
  fields: {
    id: { type: GraphQLString },
    imgUrl: { type: GraphQLString },
    type: { type: GraphQLString },
    name: { type: GraphQLString },
    price: { type: GraphQLFloat },
    inStock: { type: GraphQLInt },
    remove: { type: GraphQLBoolean },
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
      async resolve(parentValue, args, request) {
        const products = await fetch('http://127.0.0.1:3004/products', {
          method: 'get',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${request.body.token}`,
          },
        });
        return products.json();
      },
    },
    orders: {
      type: new GraphQLList(OrdersType),
      args: {},
      async resolve(parentValue, args, request) {
        const products = await fetch('http://127.0.0.1:3004/orders?id=user-4', {
          method: 'get',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${request.headers.authorization}`,
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
