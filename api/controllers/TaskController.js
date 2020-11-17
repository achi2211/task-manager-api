const _ = require('lodash');
const database = require('../../config/database');
const utils = require('../../config/utils');

const TaskController = () => {
  const create = async (req, res) => {
    const { body } = req;
    try {
      const task = await database.Task.create(body);
      return utils.successResponse(task, res);
    } catch (err) {
      console.log(err);
      return utils.validateError(err, res);
    }
  };

  const update = async (req, res) => {
    const { body } = req;
    try {
      if (body.status !== 'done' && body.status !== 'pending') {
        return res.status(400).json({
          msg: 'task status not supported. Must be `done` or `pending`',
        });
      }
      const task = await database.Task
        .update({ status: body.status }, {
          where: { id: req.params.id },
          returning: true,
        });
      return utils.successResponse(task, res);
    } catch (err) {
      console.log(err);
      return utils.validateError(err, res);
    }
  };

  const getAll = async (req, res) => {
    const { query } = req;
    try {
      const limit = _.isEmpty(query.limit) ? 3 : query.limit;
      const status = _.isEmpty(query.status) ? 'pending' : query.status;
      const condition = { active: true, status };
      const tasks = await database.Task.findAll({
        limit,
        where: condition,
        order: [
          ['number', 'ASC'],
        ],
      });
      return res.status(200).json(tasks);
    } catch (err) {
      console.log(err);
      return utils.validateError(err, res);
    }
  };

  const get = async (req, res) => {
    try {
      const condition = {
        id: req.params.id,
        active: true,
      };
      const tasks = await database.Task.findOne({ where: condition });
      return res.status(200).json(tasks);
    } catch (err) {
      console.log(err);
      return utils.validateError(err, res);
    }
  };

  return {
    create,
    update,
    getAll,
    get,
  };
};

module.exports = TaskController;
