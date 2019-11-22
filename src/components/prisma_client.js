"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var prisma_lib_1 = require("prisma-client-lib");
var typeDefs = require("./resolvers/prisma_schema").typeDefs;

var models = [
  {
    name: "User",
    embedded: false
  },
  {
    name: "BusinessType",
    embedded: false
  },
  {
    name: "Business",
    embedded: false
  },
  {
    name: "StampCard",
    embedded: false
  },
  {
    name: "Purchase",
    embedded: false
  }
];
exports.Prisma = prisma_lib_1.makePrismaClientClass({
  typeDefs,
  models,
  endpoint: `http://localhost:4466/stamps-card-api/dev`,
  secret: `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9`
});
exports.prisma = new exports.Prisma();
