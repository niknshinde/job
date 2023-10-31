const mongoose = require("mongoose");

const JobSchema = new mongoose.Schema({
  // Store the employer's user ID to associate jobs with employers
  employer: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user', // Assuming 'user' is the model name for users
  },
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  location: {
    type: String,
    required: true,
  },
  jobType: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('job', JobSchema);
