const mongoose = require('mongoose');
const dns = require('dns');
const dotenv = require('dotenv');

try {
  dns.setServers(['8.8.8.8', '1.1.1.1']);
} catch (e) {}

dotenv.config({ path: __dirname + '/.env' });

async function check() {
  const conn = await mongoose.connect(process.env.MONGO_URI);
  const db = conn.connection.db;
  const cols = [
    'user_folder',
    'admin_folder',
    'salesman_folder',
    'production_folder',
    'auditor_folder',
    'owner_folder',
  ];

  for (const col of cols) {
    const docs = await db.collection(col).find({}, { projection: { password: 0 } }).toArray();
    console.log(`\n=== Collection: ${col} (Total: ${docs.length}) ===`);
    docs.forEach((d) => {
      console.log(`  * username: ${d.username} | role: ${d.role} | email: ${d.email} | name: ${d.name}`);
    });
  }

  process.exit(0);
}

check().catch((err) => {
  console.error(err);
  process.exit(1);
});
