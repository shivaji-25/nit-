const mongoose = require('mongoose');
const createBaseUserSchema = require('./baseUserSchema');

const userSchema = createBaseUserSchema('user');

// Stored in dedicated 'user_folder' collection in MongoDB Atlas
module.exports = mongoose.model('User', userSchema, 'user_folder');
