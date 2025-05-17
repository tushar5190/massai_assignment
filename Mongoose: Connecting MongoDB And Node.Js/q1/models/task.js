const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: String,
  status: { type: String, default: 'pending' },
  dueDate: Date,
});

const Task = mongoose.model('Task', taskSchema);

module.exports = Task;
