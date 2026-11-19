const Admin = require('./Admin');
const Salesman = require('./Salesman');
const Production = require('./Production');
const Auditor = require('./Auditor');
const Owner = require('./Owner');
const User = require('./User');

const getModelByRole = (role) => {
  switch (role?.toLowerCase()) {
    case 'admin':
      return Admin;
    case 'salesman':
      return Salesman;
    case 'production':
      return Production;
    case 'auditor':
      return Auditor;
    case 'owner':
      return Owner;
    default:
      return User;
  }
};

const allRoleModels = [
  { role: 'admin', model: Admin, collection: 'admin_folder' },
  { role: 'salesman', model: Salesman, collection: 'salesman_folder' },
  { role: 'production', model: Production, collection: 'production_folder' },
  { role: 'auditor', model: Auditor, collection: 'auditor_folder' },
  { role: 'owner', model: Owner, collection: 'owner_folder' },
  { role: 'user', model: User, collection: 'user_folder' },
];

module.exports = {
  Admin,
  Salesman,
  Production,
  Auditor,
  Owner,
  User,
  getModelByRole,
  allRoleModels,
};
