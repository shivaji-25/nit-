const mongoose = require('mongoose');
const createBaseUserSchema = require('./baseUserSchema');

const productionSchema = createBaseUserSchema('production');

// Stored in dedicated 'production_folder' collection in MongoDB Atlas
module.exports = mongoose.model('Production', productionSchema, 'production_folder');
