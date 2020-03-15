"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var prisma_lib_1 = require("prisma-client-lib");
var typeDefs = require("./prisma-schema").typeDefs;

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
  endpoint: `${process.env["PRISMA_ENDPOINT"]}`,
  secret: `${process.env["APP_SECRET"]}`
});
exports.prisma = new exports.Prisma();
