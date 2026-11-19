const mongoose = require('mongoose');
const createBaseUserSchema = require('./baseUserSchema');

const ownerSchema = createBaseUserSchema('owner');

// Stored in dedicated 'owner_folder' collection in MongoDB Atlas
module.exports = mongoose.model('Owner', ownerSchema, 'owner_folder');
