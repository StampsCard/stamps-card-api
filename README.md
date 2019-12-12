
# Stamps Card API

  

## Description
- GraphQL server that provides the data for the Stamps Card app. You can see the domain model [here](https://drive.google.com/file/d/1Mhn0wnRAX-tzvCrkG7mX62GoqeSbCniK/view?usp=sharing).
- Please, be careful when you upgrade package versions from graphql yoga and prisma.
  

## Technology Stack

Based on a [Prisma boilerplate]([https://github.com/graphql-boilerplates/node-graphql-server/tree/master/basic](https://github.com/graphql-boilerplates/node-graphql-server/tree/master/basic)) provided by the organization itself to build a GraphQL server using GraphQL Yoga and ES6. 
- Build with **NodeJS** using a [IOC container](https://github.com/jaredhanson/electrolyte).
- [GraphQL Yoga]([https://github.com/prisma-labs/graphql-yoga](https://github.com/prisma-labs/graphql-yoga)) server that runs a Express JS Server based on a GraphQL schema located in `src/schema.graphql`
- We use [Prisma]([https://www.prisma.io/](https://www.prisma.io/)) as an ORM for our database. The schema is defined in `database/datamodel.prisma`.
- **Docker**  to build up an environment with the database and the Prisma API that connects with the GrpahQL Yoga server and maps the entities.
- [Now]([https://zeit.co/docs](https://zeit.co/docs)) for deployments.
- **Amazon EC2** to host the persistence systema (Prisma API).

## Set up
### Database with Prisma
Please, be careful
### Running the server



## Deployments
### ZEIT - To deploy the API
### Amazon EC2 - To deploy the Prisma API with Docker machine