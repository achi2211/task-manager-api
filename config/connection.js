const development = {
  username: process.env.TASK_MANAGER_DATABASE_USERNAME || 'postgres',
  password: process.env.TASK_MANAGER_DATABASE_PASSWORD || '',
  database: process.env.TASK_MANAGER_DATABASE_NAME || 'task_manager',
  host: process.env.TASK_MANAGER_DATABASE_HOST || 'localhost',
  dialect: 'postgres',
};

const testing = {
  username: process.env.TASK_MANAGER_DATABASE_USERNAME || 'postgres',
  password: process.env.TASK_MANAGER_DATABASE_PASSWORD || '',
  database: process.env.TASK_MANAGER_DATABASE_NAME || 'task_manager',
  host: process.env.TASK_MANAGER_DATABASE_HOST || 'localhost',
  dialect: 'postgres',
};

const production = {
  username: process.env.TASK_MANAGER_DATABASE_USERNAME,
  password: process.env.TASK_MANAGER_DATABASE_PASSWORD,
  database: process.env.TASK_MANAGER_DATABASE_NAME,
  host: process.env.TASK_MANAGER_DATABASE_HOST,
  dialect: 'postgres',

};

module.exports = {
  development,
  testing,
  production,
};
