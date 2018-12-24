__global = __dirname + '/';

const dotenv = require('dotenv');
const { GraphQLServer } = require('graphql-yoga');
const { Prisma } = require('prisma-binding');
const graphQLConfig = require('./config/graphql');
const { formatError } = require('apollo-errors');
const { permissions } = require('./components/middlewares/permissions');

const ioc = require('./initializers/00_ioc')();
const resolvers = ioc.create('resolvers/index');

dotenv.load(require('dotenv').config());

resolvers.then((resolvers) => {
    const server = new GraphQLServer({
        typeDefs: graphQLConfig.graphSchemaPath,
        resolvers: resolvers.get(),
        resolverValidationOptions: {
            requireResolversForResolveType: false
        },
        middlewares: [permissions],
        context: req => ({
            ...req,
            db: new Prisma({
                typeDefs: graphQLConfig.prismaSchemaPath,
                endpoint: process.env.PRISMA_ENDPOINT, // the endpoint of the Prisma DB service
                secret: process.env.APP_SECRET, // specified in database/prisma.yml
                debug: process.env.DEBUG, // log all GraphQL queries & mutations
            }),
        }),
    });

    const serverOptions = {
        formatError,
        debug: process.env.DEBUG
    };

    server.start(serverOptions, () => console.log('Server is running on ' + process.env.API_ENDPOINT));
});