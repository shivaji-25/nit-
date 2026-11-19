const mongoose = require('mongoose');
const createBaseUserSchema = require('./baseUserSchema');

const auditorSchema = createBaseUserSchema('auditor');

// Stored in dedicated 'auditor_folder' collection in MongoDB Atlas
module.exports = mongoose.model('Auditor', auditorSchema, 'auditor_folder');
