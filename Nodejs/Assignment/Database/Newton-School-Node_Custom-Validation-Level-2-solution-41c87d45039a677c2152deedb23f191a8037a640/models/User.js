/* User Model */
const mongoose = require('mongoose');

/*
Add custom validation to the User model
Validate that the username is at least 4 characters long, doesn't contain spaces, and doesn't contain special characters
Also add a validation for checking password length. Password should be atleast 8 chaaacters long.
*/
const userSchema = new mongoose.Schema(
    {
        username: {
            type: String,
            required: true,
            unique: true,
            validate(value) {
                if (value.length < 4) {
                    throw new Error('username must be at least 4 characters long');
                }
                if (/\s/.test(value)) {
                    throw new Error('username cannot contain spaces');
                }
                if (/[^a-zA-Z0-9]/.test(value)) {
                    throw new Error('username cannot contain special characters');
                }
            },
        },
        email: {
            type: String,
            required: true,
            unique: true
        },
        password: {
            type: String,
            required: true,
            validate(value) {
                if (value.length < 8) {
                    throw new Error('password should be atleast 8 characters long');
                }
            },
        }
    },
    { timestamps: true }
);

module.exports = mongoose.model('User', userSchema);

