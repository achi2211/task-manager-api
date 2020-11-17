module.exports = (sequelize, DataTypes) => {
  const tableName = 'tasks';

  const Task = sequelize.define('Task', {
    id: {
      allowNull: false,
      primaryKey: true,
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
    },
    number: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: {
        args: true,
        msg: 'Task title already exist, please provide another',
      },
      validate: {
        notEmpty: false,
        len: {
          args: [3, 200],
          msg: 'Please provide field within 3 to 200 characters.',
        },
      },
    },
    status: {
      type: DataTypes.STRING,
      defaultValue: 'pending',
    },
    active: {
      type: DataTypes.BOOLEAN,
      defaultValue: true,
    },
  }, { tableName });

  return Task;
};
