
const mongoose = require("mongoose")
const { Schema } = mongoose;



const UsersSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    companyName: {
        type: String,
    },
    industry: {
        type: String
    },
    companyDescription: {
        type: String
    },
    companyLocation: {
        type: String
    },
    password: {
        type: String,
        required: true
    },
    role:{
        type: String,
    },
    date: {
        type: Date,
        default: Date.now
    }
  });

  module.exports = mongoose.model('user',UsersSchema)