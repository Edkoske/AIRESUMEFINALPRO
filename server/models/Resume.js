const mongoose = require('mongoose');

const resumeSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  title: { type: String, required: true },
  data: { type: Object, required: true }, // structured JSON or AI text
  template: { type: String, default: 'modern' },
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Resume', resumeSchema);
