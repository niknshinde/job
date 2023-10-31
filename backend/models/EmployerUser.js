const mongoose = require("mongoose");

const EmployerUserSchema = new mongoose.Schema({
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
        required: true
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
    date: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('employeruser', EmployerUserSchema);
