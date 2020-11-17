/**
 * third party libraries
 */

// eslint-disable-next-line no-unused-vars
const dotenv = require('dotenv').config();
const bodyParser = require('body-parser');
const express = require('express');
const helmet = require('helmet');
const http = require('http');
const mapRoutes = require('express-routes-mapper');
const cors = require('cors');

/**
 * server configuration
 */
const config = require('../config');
const dbService = require('./services/db.service');

// environment: development, staging, testing, production
const environment = process.env.NODE_ENV;

/**
 * express application
 */
const app = express();
const server = http.Server(app);
const mappedPublicRoutes = mapRoutes(config.publicRoutes, 'api/controllers/');

const DB = dbService(environment, config.migrate).start();

const allowedOrigins = [
  'http://task-manager-truenorth.s3-website-us-west-2.amazonaws.com',
  'http://localhost:8080',
];

app.use(cors({
  origin: (origin, callback) => {
    // allow requests with no origin
    // (like mobile apps or curl requests)
    if (!origin) return callback(null, true);
    if (allowedOrigins.indexOf(origin) === -1) {
      const msg = `The CORS policy for this site: ${origin}
        does not allow access from the specified Origin.`;
      return callback(new Error(msg), false);
    }
    return callback(null, true);
  },
}));

// secure express app
app.use(helmet({
  dnsPrefetchControl: false,
  frameguard: false,
  ieNoOpen: false,
}));

// parsing the request bodys
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// fill routes for express application
app.use('/public', mappedPublicRoutes);

server.listen(config.port, () => {
  if (environment !== 'production'
    && environment !== 'development'
    && environment !== 'testing'
  ) {
    console.error(`NODE_ENV is set to ${environment}, but only production and development are valid.`);
    process.exit(1);
  }
  return DB;
});
