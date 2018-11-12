__global = __dirname + '/';

const dotenv = require('dotenv');
dotenv.load(require('dotenv').config());

const { GraphQLServer } = require('graphql-yoga');
const { Prisma } = require('prisma-binding');
const graphQLConfig = require('./config/graphql');
const { formatError } = require('apollo-errors');

const ioc = require('./initializers/00_ioc')();
const resolvers = ioc.create('resolvers/index');
const permissions = ioc.create('middlewares/permissions');

permissions.then((permissionsPromise) => {

    resolvers.then((resolversPromise) => {
        const server = new GraphQLServer({
            typeDefs: graphQLConfig.graphSchemaPath,
            resolvers: resolversPromise.get(),
            resolverValidationOptions: {
                requireResolversForResolveType: false
            },
            context: req => ({
                ...req,
                db: new Prisma({
                    typeDefs: graphQLConfig.prismaSchemaPath,
                    endpoint: process.env.PRISMA_ENDPOINT, // the endpoint of the Prisma DB service
                    secret: process.env.PRISMA_SECRET, // specified in database/prisma.yml
                    debug: process.env.DEBUG, // log all GraphQL queries & mutations
                }),
            }),
            middleware: [permissionsPromise.get()],
        });

        const serverOptions = {
            formatError
        };

        server.start(serverOptions, () => console.log('Server is running on http://localhost:4000'));
    });
});
