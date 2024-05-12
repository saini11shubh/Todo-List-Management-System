const { Schema, model, mongoose } = require('mongoose');

const TodoModel = new Schema({
    id: {
        type: Number,
        index: true,
        unique: true
    },
    description: {
        type: String,
        required: true
    },
    status: {
        type: String,
        enum: ['Pending', 'Completed'],
        default: 'Pending'
    }
}, { versionKey: false });

TodoModel.pre('save', async function (next) {
    const doc = this;
    try {
        if (!doc.id) {
            const latestTodo = await mongoose.model('Todo_List').findOne({}, {}, { sort: { 'id': -1 } });
            // If no document exists, start from 1
            if (!latestTodo) {
                doc.id = 1;
            } else {
                // Otherwise, increment the ID
                doc.id = latestTodo.id + 1;
            }
        }
        next();
    } catch (error) {
        next(error);
    }
});
module.exports = model('Todo_List', TodoModel);