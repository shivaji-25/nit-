const mongoose = require('mongoose');
const dns = require('dns');
const dotenv = require('dotenv');
const User = require('../models/User');

try {
  dns.setServers(['8.8.8.8', '1.1.1.1']);
} catch (e) {}

dotenv.config({ path: __dirname + '/../.env' });

const seedUsers = async () => {
  try {
    const mongoUri = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/food_mfg_db';
    await mongoose.connect(mongoUri);
    console.log('MongoDB connected for seeding users...');

    const defaultUsers = [
      {
        name: 'Factory Admin',
        username: 'admin',
        email: 'admin@factory.com',
        password: 'adminPassword123',
        role: 'admin',
        phone: '9876543210',
      },
      {
        name: 'Salesman A (Tamil Nadu)',
        username: 'salesman',
        email: 'salesman@factory.com',
        password: 'salesPassword123',
        role: 'salesman',
        phone: '9876543211',
      },
      {
        name: 'Salesman B (Karnataka)',
        username: 'salesman_b',
        email: 'salesman_b@factory.com',
        password: 'salesPassword123',
        role: 'salesman',
        phone: '9876543212',
      },
      {
        name: 'Floor Supervisor',
        username: 'production',
        email: 'production@factory.com',
        password: 'prodPassword123',
        role: 'production',
        phone: '9876543213',
      },
      {
        name: 'External Auditor',
        username: 'auditor',
        email: 'auditor@factory.com',
        password: 'auditPassword123',
        role: 'auditor',
        phone: '9876543214',
      },
      {
        name: 'Factory Owner',
        username: 'owner',
        email: 'owner@factory.com',
        password: 'ownerPassword123',
        role: 'owner',
        phone: '9876543215',
      },
    ];

    for (const userData of defaultUsers) {
      let existing = await User.findOne({ email: userData.email });
      if (!existing) {
        await User.create(userData);
        console.log(`Created user: ${userData.username} / ${userData.email} (${userData.role})`);
      } else {
        if (!existing.username) {
          existing.username = userData.username;
          await existing.save();
          console.log(`Updated username for user: ${userData.username}`);
        } else {
          console.log(`User already exists: ${existing.username} (${userData.email})`);
        }
      }
    }

    console.log('Users successfully verified/seeded.');
    if (require.main === module) {
      process.exit(0);
    }
  } catch (error) {
    console.error('Error seeding users:', error);
    if (require.main === module) {
      process.exit(1);
    }
  }
};

if (require.main === module) {
  seedUsers();
}

module.exports = seedUsers;
