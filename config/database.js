const Sequelize = require('sequelize');
const path = require('path');
var fs = require("fs");

const connection = require('./connection');
let sequelize;

switch (process.env.NODE_ENV) {
  case 'production':
    sequelize = new Sequelize(
      connection.production.database,
      connection.production.username,
      connection.production.password, {
      host: connection.production.host,
      dialect: connection.production.dialect,
      pool: {
        max: 5,
        min: 0,
        idle: 10000,
      },
    });
    break;
  case 'testing':
    sequelize = new Sequelize(
      connection.testing.database,
      connection.testing.username,
      connection.testing.password, {
      host: connection.testing.host,
      dialect: connection.testing.dialect,
      pool: {
        max: 5,
        min: 0,
        idle: 10000,
      },
    });
    break;
  default:
    sequelize = new Sequelize(
      connection.development.database,
      connection.development.username,
      connection.development.password, {
      host: connection.development.host,
      dialect: connection.development.dialect,
      pool: {
        max: 5,
        min: 0,
        idle: 10000,
      },
    });
}
const dirNamePath = path.join(__dirname, "../api/models");

let database = {};

fs
  .readdirSync(dirNamePath)
  .filter(function (file) {
    return (file.indexOf(".") !== 0) && (file !== "index.js");
  })
  .forEach(function (file) {
    var model = sequelize.import(path.join(dirNamePath, file));
    database[model.name] = model;
  });

Object.keys(database).forEach(function (modelName) {
  if ("associate" in database[modelName]) {
    database[modelName].associate(database);
  }
});

//clears up any confusion
database.sequelize = sequelize;
database.Sequelize = Sequelize;

module.exports = database;
