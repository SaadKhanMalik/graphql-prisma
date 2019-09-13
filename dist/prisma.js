'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = undefined;

var _prismaBinding = require('prisma-binding');

var _index = require('./resolvers/index');

var prisma = new _prismaBinding.Prisma({
  typeDefs: 'src/generated/prisma.graphql',
  endpoint: process.env.PRISMA_ENDPOINT,
  secret: '12345678910dd',
  fragmentReplacements: _index.fragmentReplacements
});

exports.default = prisma;