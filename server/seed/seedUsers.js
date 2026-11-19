const mongoose = require('mongoose');
const dotenv = require('dotenv');
const User = require('../models/User');

dotenv.config({ path: __dirname + '/../.env' });

const seedUsers = async () => {
  try {
    const mongoUri = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/food_mfg_db';
    await mongoose.connect(mongoUri);
    console.log('MongoDB connected for seeding users...');

    const defaultUsers = [
      {
        name: 'Factory Admin',
        email: 'admin@factory.com',
        password: 'adminPassword123',
        role: 'admin',
        phone: '9876543210',
      },
      {
        name: 'Salesman A (Tamil Nadu)',
        email: 'salesman@factory.com',
        password: 'salesPassword123',
        role: 'salesman',
        phone: '9876543211',
      },
      {
        name: 'Salesman B (Karnataka)',
        email: 'salesman_b@factory.com',
        password: 'salesPassword123',
        role: 'salesman',
        phone: '9876543212',
      },
      {
        name: 'Floor Supervisor',
        email: 'production@factory.com',
        password: 'prodPassword123',
        role: 'production',
        phone: '9876543213',
      },
      {
        name: 'External Auditor',
        email: 'auditor@factory.com',
        password: 'auditPassword123',
        role: 'auditor',
        phone: '9876543214',
      },
      {
        name: 'Factory Owner',
        email: 'owner@factory.com',
        password: 'ownerPassword123',
        role: 'owner',
        phone: '9876543215',
      },
    ];

    for (const userData of defaultUsers) {
      const existing = await User.findOne({ email: userData.email });
      if (!existing) {
        await User.create(userData);
        console.log(`Created user: ${userData.email} (${userData.role})`);
      } else {
        console.log(`User already exists: ${userData.email}`);
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
