const mongoose = require('mongoose');
const dns = require('dns');
const dotenv = require('dotenv');

try {
  dns.setServers(['8.8.8.8', '1.1.1.1']);
} catch (e) {}

dotenv.config({ path: __dirname + '/../.env' });

const {
  Admin,
  Salesman,
  Production,
  Auditor,
  Owner,
  User,
  getModelByRole,
} = require('../models');

const seedUsers = async () => {
  try {
    const mongoUri = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/food_mfg_db';
    if (mongoose.connection.readyState === 0) {
      await mongoose.connect(mongoUri);
    }
    console.log('MongoDB connected for seeding separated role folders...');

    const roleDataList = [
      {
        role: 'admin',
        model: Admin,
        folderName: 'admin_folder',
        userData: {
          name: 'Factory Admin',
          username: 'admin',
          email: 'admin@factory.com',
          password: 'adminPassword123',
          role: 'admin',
          phone: '9876543210',
        },
      },
      {
        role: 'salesman',
        model: Salesman,
        folderName: 'salesman_folder',
        userData: {
          name: 'Salesman A (Tamil Nadu)',
          username: 'salesman',
          email: 'salesman@factory.com',
          password: 'salesPassword123',
          role: 'salesman',
          phone: '9876543211',
        },
      },
      {
        role: 'salesman',
        model: Salesman,
        folderName: 'salesman_folder',
        userData: {
          name: 'Salesman B (Karnataka)',
          username: 'salesman_b',
          email: 'salesman_b@factory.com',
          password: 'salesPassword123',
          role: 'salesman',
          phone: '9876543212',
        },
      },
      {
        role: 'production',
        model: Production,
        folderName: 'production_folder',
        userData: {
          name: 'Floor Supervisor',
          username: 'production',
          email: 'production@factory.com',
          password: 'prodPassword123',
          role: 'production',
          phone: '9876543213',
        },
      },
      {
        role: 'auditor',
        model: Auditor,
        folderName: 'auditor_folder',
        userData: {
          name: 'External Auditor',
          username: 'auditor',
          email: 'auditor@factory.com',
          password: 'auditPassword123',
          role: 'auditor',
          phone: '9876543214',
        },
      },
      {
        role: 'owner',
        model: Owner,
        folderName: 'owner_folder',
        userData: {
          name: 'Factory Owner',
          username: 'owner',
          email: 'owner@factory.com',
          password: 'ownerPassword123',
          role: 'owner',
          phone: '9876543215',
        },
      },
      {
        role: 'user',
        model: User,
        folderName: 'user_folder',
        userData: {
          name: 'Standard Staff User',
          username: 'user',
          email: 'user@factory.com',
          password: 'userPassword123',
          role: 'user',
          phone: '9876543216',
        },
      },
    ];

    for (const item of roleDataList) {
      const existing = await item.model.findOne({
        $or: [{ username: item.userData.username }, { email: item.userData.email }],
      });
      if (!existing) {
        await item.model.create(item.userData);
        console.log(`Created in ${item.folderName}: ${item.userData.username} (${item.userData.email})`);
      } else {
        console.log(`Verified in ${item.folderName}: ${item.userData.username}`);
      }
    }

    console.log('All separated role folder collections successfully seeded/verified in MongoDB Atlas.');
    if (require.main === module) {
      process.exit(0);
    }
  } catch (error) {
    console.error('Error seeding separated role folders:', error);
    if (require.main === module) {
      process.exit(1);
    }
  }
};

if (require.main === module) {
  seedUsers();
}

module.exports = seedUsers;
