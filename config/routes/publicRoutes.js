const authRoutes = {
  'GET /tasks': 'TaskController.getAll',
  'GET /tasks/:id': 'TaskController.get',
  'PUT /tasks/:id': 'TaskController.update',
  'POST /tasks': 'TaskController.create',
};

module.exports = authRoutes;
