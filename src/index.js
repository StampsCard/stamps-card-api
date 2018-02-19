
__global = __dirname + '/';

require('dotenv').config();

const { GraphQLServer } = require('graphql-yoga');
const { Prisma } = require('prisma-binding');
const graphQLConfig = require('./config/graphql');

const ioc = require('./initializers/00_ioc')();

const resolvers = ioc.create('resolvers/index');
resolvers.then(function(resolvers){
    console.log(resolvers);
    const server = new GraphQLServer({
      typeDefs: graphQLConfig.graphSchemaPath,
      resolvers: resolvers.get(),
      context: req => ({
        ...req,
        db: new Prisma({
          typeDefs: graphQLConfig.prismaSchemaPath,
          endpoint: process.env.PRISMA_HOST, // the endpoint of the Prisma DB service
          secret: process.env.PRISMA_SECRET, // specified in database/prisma.yml
          debug: process.env.DEBUG, // log all GraphQL queryies & mutations
        }),
      }),
    });

    server.start(() => console.log('Server is running on http://localhost:4000'));
});