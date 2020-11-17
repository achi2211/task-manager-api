module.exports = {
  username: process.env.TASK_MANAGER_DATABASE_USERNAME || 'postgres',
  password: process.env.TASK_MANAGER_DATABASE_PASSWORD || '',
  database: process.env.TASK_MANAGER_DATABASE_NAME || 'task_manager',
  host: process.env.TASK_MANAGER_DATABASE_HOST || 'localhost',
  dialect: 'postgres',
};
