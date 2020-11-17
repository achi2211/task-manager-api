const publicRoutes = require("./routes/publicRoutes");

/*
  if `migrate:false` it drops and creates the tables
*/

const config = {
  migrate: true,
  publicRoutes,
  port: process.env.PORT || "3000",
};

module.exports = config;
