__global = __dirname + '/';

const dotenv = require('dotenv');
const { GraphQLServer } = require('graphql-yoga');
const { formatError } = require('apollo-errors');
const { permissions } = require('./components/middlewares/permissions');
const prismaClient = require('../database/generated/prisma-client/index');
const ioc = require('./initializers/00_ioc')();
const resolvers = ioc.create('resolvers/index');

dotenv.load(require('dotenv').config());

resolvers
    .then((resolvers) => {
        const server = new GraphQLServer({
            typeDefs: './src/schema.graphql',
            resolvers: resolvers.get(),
            resolverValidationOptions: {
                requireResolversForResolveType: false
            },
            middlewares: [permissions],
            context: req => ({
                ...req,
                db: prismaClient,
            }),
        });
        

        const serverOptions = {
            formatError,
            debug: process.env.DEBUG
        };

        server.start(serverOptions, () => console.log('Server is running on ' + process.env.API_ENDPOINT));
    })
    .catch(e => console.log('Error when starting the server', e));
