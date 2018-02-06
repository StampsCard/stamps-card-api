const { GraphQLServer } = require('graphql-yoga');
const { Prisma } = require('prisma-binding');

const resolvers = require('./resolvers/index');

global.__pwd = __dirname + '/';

global.rootRequire = function(name) {
    return require(__dirname + '/' + name);
};


const server = new GraphQLServer({
  typeDefs: './src/schema.graphql',
  resolvers: resolvers,
  context: req => ({
    ...req,
    db: new Prisma({
      typeDefs: 'src/generated/prisma.graphql',
      endpoint: 'http://localhost:4466/stamps-card-api/dev', // the endpoint of the Prisma DB service
      secret: 'mysecret123', // specified in database/prisma.yml
      debug: true, // log all GraphQL queryies & mutations
    }),
  }),
});

server.start(() => console.log('Server is running on http://localhost:4000'));
