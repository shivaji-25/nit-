const mongoose = require('mongoose');
const createBaseUserSchema = require('./baseUserSchema');

const salesmanSchema = createBaseUserSchema('salesman');

// Stored in dedicated 'salesman_folder' collection in MongoDB Atlas
module.exports = mongoose.model('Salesman', salesmanSchema, 'salesman_folder');
