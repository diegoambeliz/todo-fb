const { Router } = require('express');
const router = Router();
const todoController = require('../controllers/todo');

// Routes
router.get('/', todoController.home);
router.post('/add-task', todoController.addTask);
router.get('/update-status/:key/:status', todoController.moveTaskToSomeStatus);

module.exports = router;