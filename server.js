const express = require('express');
const helmet = require('helmet')

const apiRouter = require("./api/router.js");

const server = express();

// Global Middleware
server.use(express.json()); // built-in MW - no need to npm install it
// server.use(morgan("dev"));
server.use(helmet()); // free extra security. Always use it.

server.use(logger);

function logger(req, res, next) {
    console.log(`a ${req.method} request to ${req.url} on ${Date.now()}`)
    next()
}

module.exports = server;
