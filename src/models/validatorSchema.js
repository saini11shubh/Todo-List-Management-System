const Joi = require('joi');

exports.updateTodoList = Joi.object({
    description: Joi.string().optional(),
    status: Joi.string().valid('Pending', 'Completed'),
})
exports.createTodoItem = Joi.object({
    description: Joi.string().required()
})