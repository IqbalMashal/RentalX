const mongoose = require('mongoose');

export const userSchema = new mongoose.Schema({
    fullName: {
        type: String,
        required: true,
    },
    firstName: {
        type: String,
        required: true,
    },
    lastName: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true  
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

