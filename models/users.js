const mongoose = require('mongoose');
const string_decoder = require("node:string_decoder");

const userSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true,
        match: [/^[^\s@]+@[^\s@]+\.[^\s@]+$/, "Please use a valid email address"] },
    password:
     { type: String,
    required: true,
    },
    phone:{type:String,required: true},
    role: { type: String,enum: ['admin', 'salesperson','storekeeper'],default: 'salesperson' },
}, { timestamps: true });

module.exports = mongoose.model('User', userSchema);