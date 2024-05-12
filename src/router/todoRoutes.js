const express = require('express');
const router = express.Router();
const multer = require('multer');
const upload = multer({ dest: 'uploads/' });
const { isAuthenticatedUser } = require('../middleware/auth');
const todoController = require('../controller/todoController');
const { catchErrors } = require('../middleware/errorHandler');
const validator = require("../utility/validator-response");
const { updateTodoList } = require("../models/validatorSchema");
//upload csv file
router.post('/todos/upload', isAuthenticatedUser, upload.single('csvFile'), catchErrors(todoController.uploadTodoItems));
router.get('/todos/download', isAuthenticatedUser, catchErrors(todoController.downloadTodoList));
router.get('/todos/filter', isAuthenticatedUser, catchErrors(todoController.filterTodoItems));

router.get('/todos', isAuthenticatedUser, catchErrors(todoController.getAllTodos));
router.get('/todos/:id', isAuthenticatedUser, catchErrors(todoController.getTodoList));
router.post('/todos', isAuthenticatedUser, catchErrors(todoController.addTodoItem));
router.put('/todos/:id', isAuthenticatedUser, validator(updateTodoList), catchErrors(todoController.updateTodo));
router.delete('/todos/:id', isAuthenticatedUser, catchErrors(todoController.deleteTodo));

module.exports = router;