const mongoose = require('mongoose');
const createBaseUserSchema = require('./baseUserSchema');

const adminSchema = createBaseUserSchema('admin');

// Stored in dedicated 'admin_folder' collection in MongoDB Atlas
module.exports = mongoose.model('Admin', adminSchema, 'admin_folder');
