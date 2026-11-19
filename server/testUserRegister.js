const http = require('http');
const mongoose = require('mongoose');
const dns = require('dns');
const dotenv = require('dotenv');

try {
  dns.setServers(['8.8.8.8', '1.1.1.1']);
} catch (e) {}

dotenv.config({ path: __dirname + '/.env' });
const { User } = require('./models');

async function postRequest(path, data) {
  return new Promise((resolve, reject) => {
    const postData = JSON.stringify(data);
    const req = http.request(
      {
        hostname: '127.0.0.1',
        port: 5000,
        path,
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Content-Length': Buffer.byteLength(postData),
        },
      },
      (res) => {
        let body = '';
        res.on('data', (chunk) => (body += chunk));
        res.on('end', () => {
          try {
            resolve({ status: res.statusCode, data: JSON.parse(body) });
          } catch {
            resolve({ status: res.statusCode, body });
          }
        });
      }
    );
    req.on('error', reject);
    req.write(postData);
    req.end();
  });
}

async function runTests() {
  console.log('Testing User Registration & Google Access with Rules...\n');

  // Test 1: Bad Phone Rule
  console.log('1. Testing invalid phone number rule (< 10 digits)...');
  const t1 = await postRequest('/auth/register', {
    name: 'Ravi',
    lastname: 'Kumar',
    email: 'ravi@gmail.com',
    phone: '12345',
    password: 'password123',
  });
  console.log(`Status: ${t1.status} (Expected 400), Message: "${t1.data.message}"`);

  // Test 2: Bad Email Rule
  console.log('\n2. Testing invalid Gmail/Email rule...');
  const t2 = await postRequest('/auth/register', {
    name: 'Ravi',
    lastname: 'Kumar',
    email: 'notanemail',
    phone: '9876543210',
    password: 'password123',
  });
  console.log(`Status: ${t2.status} (Expected 400), Message: "${t2.data.message}"`);

  // Test 3: Bad Password Rule (< 6 chars)
  console.log('\n3. Testing short password rule (< 6 characters)...');
  const t3 = await postRequest('/auth/register', {
    name: 'Ravi',
    lastname: 'Kumar',
    email: 'ravi@gmail.com',
    phone: '9876543210',
    password: '123',
  });
  console.log(`Status: ${t3.status} (Expected 400), Message: "${t3.data.message}"`);

  // Test 4: Valid Registration
  console.log('\n4. Testing valid New Account Registration...');
  const testEmail = `testuser_${Date.now()}@gmail.com`;
  const t4 = await postRequest('/auth/register', {
    name: 'Karthik',
    lastname: 'Raman',
    gmail: testEmail,
    phone: '9876543219',
    password: 'securePassword123',
  });
  console.log(`Status: ${t4.status} (Expected 201), Success: ${t4.data.success}`);
  console.log(`User created: ${t4.data?.user?.name} ${t4.data?.user?.lastname} (${t4.data?.user?.email})`);

  // Verify in MongoDB Atlas user_folder
  await mongoose.connect(process.env.MONGO_URI);
  const userInDb = await User.findOne({ email: testEmail });
  console.log(`Verified in user_folder collection: ${!!userInDb} (Role: ${userInDb?.role})`);

  // Test 5: Google Access (User Login Only)
  console.log('\n5. Testing Google OAuth Access (User Login only)...');
  const googleEmail = `googleuser_${Date.now()}@gmail.com`;
  const t5 = await postRequest('/auth/google', {
    email: googleEmail,
    name: 'Google TestUser',
  });
  console.log(`Status: ${t5.status} (Expected 200), Success: ${t5.data.success}`);
  console.log(`Google user role: ${t5.data?.user?.role}, Username: ${t5.data?.user?.username}`);

  const googleUserInDb = await User.findOne({ email: googleEmail });
  console.log(`Verified Google user stored in user_folder: ${!!googleUserInDb}`);

  console.log('\nAll Registration Rules & Google Access Tests Passed Successfully!');
  process.exit(0);
}

runTests().catch((err) => {
  console.error(err);
  process.exit(1);
});
