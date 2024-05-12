const Joi = require('joi');

exports.updateTodoList = Joi.object({
    description: Joi.string().optional(),
    status: Joi.string().valid('Pending', 'Completed'),
})