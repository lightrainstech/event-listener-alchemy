'use strict'

require('dotenv').config()
// Require the fastify framework and instantiate it
const fastify = require('fastify')({
  logger: true
})
// Require external modules
const path = require('path')
const AutoLoad = require('@fastify/autoload')
const Etag = require('@fastify/etag')

module.exports = function (fastify, opts, next) {
  fastify.register(require('@fastify/cors'), {
    origin: ['https://smuggleverse.com', /\.smuggleverse\.com$/],
    allowedHeaders: ['Authorization', 'Content-Type', 'x-admin-auth'],
    credentials: true
  })
  fastify.register(Etag)

  fastify.register(AutoLoad, {
    dir: path.join(__dirname, 'plugins')
  })

  next()
}
