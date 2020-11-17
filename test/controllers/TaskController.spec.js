const sinon = require('sinon');
const expect = require('chai').expect
const database = require('../../config/database');
const TaskController = require('../../api/controllers/TaskController');

describe('Task controller', () => {

  const tasks = [
    {
      "id": "d760ccd2-108c-46c9-b2e9-a816e5d6bbc4",
      "title": "Task 2",
      "status": "done",
      "active": true,
      "createdAt": "2020-11-12T23:51:04.398Z",
      "updatedAt": "2020-11-12T23:52:59.790Z"
    },
    {
      "id": "44855a23-60a8-44ec-bafc-d674f24c7b43",
      "title": "Task 1",
      "status": "done",
      "active": true,
      "createdAt": "2020-11-12T23:50:57.460Z",
      "updatedAt": "2020-11-12T23:56:45.056Z"
    }
  ];

  const task = {
    "id": "d760ccd2-108c-46c9-b2e9-a816e5d6bbc4",
    "title": "Task 2",
    "status": "done",
    "active": true,
    "createdAt": "2020-11-12T23:51:04.398Z",
    "updatedAt": "2020-11-12T23:52:59.790Z"
  };

  const error = new Error("Some error");
  let req = {};
  let res = {};
  let resSpy = {};

  describe('GET tasks', () => {
    beforeEach(function () {
      resSpy = sinon.spy();
      res = {
        status: sinon.stub().returns({ json: resSpy }),
      };
    });

    it('should return task list', async () => {
      const findAll = sinon.stub(database.Task, 'findAll').resolves(tasks);
      req = { query: { limit: 5 } };
      await TaskController().getAll(req, res)

      // console.log(resSpy.getCall(0).args)

      expect(findAll.calledOnce).to.equal(true);
      expect(resSpy.calledOnce).to.equal(true);
      expect(resSpy.calledWith(tasks)).to.equal(true);
      findAll.restore();
    });

    it('findAll should be called with limit `3` and status `pending` if data is not provided', async () => {
      const findAll = sinon.stub(database.Task, 'findAll').resolves(tasks);
      req = { query: {} };
      await TaskController().getAll(req, res)
      expect(findAll.calledOnce).to.equal(true);

      expect(findAll.calledWith(
        {
          limit: 3,
          where: { active: true, status: 'pending' },
          order: [['number', 'ASC']]
        })).to.equal(true);

      findAll.restore();
    });

    it('should return internal error', async () => {
      sinon.stub(database.Task, 'findAll').throwsException(error);

      await TaskController().getAll(req, res);

      expect(resSpy.calledWith({ msg: "Internal server error" })).to.equal(true);
      expect(res.status.calledWith(500)).to.equal(true)
    });
  });

  describe('GET task', () => {
    beforeEach(function () {
      resSpy = sinon.spy();
      res = {
        status: sinon.stub().returns({ json: resSpy }),
      };
    });

    it('should return a task', async () => {
      const findOne = sinon.stub(database.Task, 'findOne').resolves(task);
      req = { params: { id: "d760ccd2-108c-46c9-b2e9-a816e5d6bbc4" } };
      await TaskController().get(req, res)

      expect(findOne.calledOnce).to.equal(true);
      expect(resSpy.calledOnce).to.equal(true);
      expect(resSpy.calledWith(task)).to.equal(true);
      findOne.restore();
    });

    it('should return internal error', async () => {
      sinon.stub(database.Task, 'findOne').throwsException(error);

      await TaskController().get(req, res);

      expect(resSpy.calledWith({ msg: "Internal server error" })).to.equal(true);
      expect(res.status.calledWith(500)).to.equal(true)
    });
  });

  describe('Update task', () => {
    beforeEach(function () {
      resSpy = sinon.spy();
      res = {
        status: sinon.stub().returns({ json: resSpy }),
      };
    });

    it('should update a task', async () => {
      const update = sinon.stub(database.Task, 'update').resolves(task);
      req = {
        params: { id: "d760ccd2-108c-46c9-b2e9-a816e5d6bbc4" },
        body: { status: "done" }
      };
      await TaskController().update(req, res)

      expect(update.calledOnce).to.equal(true);
      expect(resSpy.calledOnce).to.equal(true);
      expect(resSpy.calledWith(task)).to.equal(true);
      update.restore();
    });

    it('should return internal error', async () => {
      sinon.stub(database.Task, 'update').throwsException(error);

      await TaskController().update(req, res);

      expect(resSpy.calledWith({ msg: "Internal server error" })).to.equal(true);
      expect(res.status.calledWith(500)).to.equal(true)
    });
  });

});
