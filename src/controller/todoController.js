const todoModel = require("../models/todoModel");
const fs = require("fs");
const csv = require('csv-parser');
const { Parser } = require('json2csv');

exports.getAllTodos = async (req, res) => {
    const todoItems = await todoModel.find();

    // Return the Todo items
    res.status(200).json(todoItems);
}

exports.getTodoList = async (req, res) => {
    const id = Number(req.params.id);
    const todoItem = await todoModel.findOne({ id: id });
    // If no Todo item found, return 404 Not Found
    if (!todoItem) {
        return res.status(404).json({ error: 'Todo item not found' });
    }
    // If found, return the Todo item
    res.status(200).json(todoItem);
}

exports.addTodoItem = async (req, res) => {
    const { description } = req.body;
    // Validate input
    if (!description) {
        return res.status(400).json({ error: 'Description is required' });
    }
    // Create a new TodoItem instance
    const newTodo = new todoModel({ description });
    // Save the Todo item to the database
    await newTodo.save();
    // Send a success response
    res.status(201).json({ message: 'Todo item saved successfully', todo: newTodo });
}

exports.updateTodo = async (req, res) => {
    const todoId = req.params.id;
    const todoBody = req.body;
    const todoEntity = await todoModel.findOneAndUpdate({ id: todoId }, todoBody, { new: true });
    if (todoEntity) {
        return res.status(200).json({
            status: true,
            message: `Todo ${todoId} is updated successfully.`
        });
    }
    else {
        return res.status(200).json({
            status: false,
            message: `Todo ${todoId} is not updated.`
        });
    }
}

exports.deleteTodo = async (req, res) => {
    const todoId = req.params.id;
    const todoEntity = await todoModel.findOneAndDelete({ id: todoId });
    if (todoEntity) {
        return res.status(200).json({
            status: true,
            message: `Todo ${todoId} is Deleted successfully.`
        });
    }
    else {
        return res.status(200).json({
            status: false,
            message: `Todo ${todoId} is not Deleted.`
        });
    }
}

exports.uploadTodoItems = async (req, res) => {
    if (!req.file) {
        return res.status(400).json({ error: 'No file uploaded' });
    }
    const results = [];
    fs.createReadStream(req.file.path)
        .pipe(csv())
        .on('data', (data) => results.push(data))
        .on('end', async () => {
            // Process the CSV data and save Todo items to the database
            for (const result of results) {
                const { description, status } = result;
                const todoItem = new todoModel({ description, status });
                await todoItem.save();
            }
            // Delete the uploaded file
            fs.unlinkSync(req.file.path);
            res.status(201).json({ message: 'Todo items uploaded successfully' });
        });
};

exports.downloadTodoList = async (req, res) => {
    const todoItems = await todoModel.find().lean();

    //convert todo item to json format
    const jsonTodoItems = todoItems;

    //Define CSV fields
    const fields = ["id", "description", "status"];

    //Create CSV parser
    const json2csvParser = new Parser({ fields });

    //convert JSON data to CSV format
    const csvData = json2csvParser.parse(jsonTodoItems);

    // Set response headers for file download
    res.header('Content-Type', 'text/csv');
    res.attachment('todo_list.csv');
    // Send CSV data as response
    res.send(csvData);
};

exports.filterTodoItems = async (req, res) => {
    const status = req.query.status;
    const todoItem = await todoModel.find({ status: status });
    // If no Todo item found, return 404 Not Found
    if (!todoItem) {
        return res.status(404).json({ error: 'Todo item not found' });
    }
    // If found, return the Todo item
    res.status(200).json(todoItem);
}
