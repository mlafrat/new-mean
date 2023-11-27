const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Create schema for user
const userSchema = new Schema({
    user_id: {
        type: Number,
        required: true,
        unique: true // Assuming user_id should be unique
    },
    username: {
        type: String,
        required: true,
        unique: true // Assuming usernames should be unique
    },
    password: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true // Assuming emails should be unique
    }
    // You can add more fields like createdAt, updatedAt, etc.
}, { collection: 'userData' });

// Create model for user
const User = mongoose.model('User', userSchema);

module.exports = User;
