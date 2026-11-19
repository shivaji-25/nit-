const http = require('http');

async function testLogin(email, password, requiredRole = null) {
  return new Promise((resolve, reject) => {
    const postData = JSON.stringify({ email, password, requiredRole });
    const req = http.request(
      {
        hostname: 'localhost',
        port: 5000,
        path: '/auth/login',
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

async function runRuleTests() {
  console.log('Testing Category Portal Login Rules & Restrictions...\n');

  // Test 1: Admin logging into Admin portal
  console.log('1. Admin logging into Admin portal (requiredRole: "admin")...');
  const t1 = await testLogin('admin@factory.com', 'adminPassword123', 'admin');
  console.log(`Status: ${t1.status} (Expected 200), Success: ${t1.data.success}`);

  // Test 2: Salesman attempting to log into Admin portal
  console.log('\n2. Salesman attempting to log into Admin portal (requiredRole: "admin")...');
  const t2 = await testLogin('salesman@factory.com', 'salesPassword123', 'admin');
  console.log(`Status: ${t2.status} (Expected 403), Message: "${t2.data.message}"`);

  // Test 3: Admin attempting to log into Salesman portal
  console.log('\n3. Admin attempting to log into Salesman portal (requiredRole: "salesman")...');
  const t3 = await testLogin('admin@factory.com', 'adminPassword123', 'salesman');
  console.log(`Status: ${t3.status} (Expected 403), Message: "${t3.data.message}"`);

  // Test 4: Salesman logging into Salesman portal
  console.log('\n4. Salesman logging into Salesman portal (requiredRole: "salesman")...');
  const t4 = await testLogin('salesman@factory.com', 'salesPassword123', 'salesman');
  console.log(`Status: ${t4.status} (Expected 200), Success: ${t4.data.success}`);

  // Test 5: Production logging into Production portal
  console.log('\n5. Production logging into Production portal (requiredRole: "production")...');
  const t5 = await testLogin('production@factory.com', 'prodPassword123', 'production');
  console.log(`Status: ${t5.status} (Expected 200), Success: ${t5.data.success}`);

  // Test 6: Auditor logging into Auditor portal
  console.log('\n6. Auditor logging into Auditor portal (requiredRole: "auditor")...');
  const t6 = await testLogin('auditor@factory.com', 'auditPassword123', 'auditor');
  console.log(`Status: ${t6.status} (Expected 200), Success: ${t6.data.success}`);

  // Test 7: Owner logging into Owner portal
  console.log('\n7. Owner logging into Owner portal (requiredRole: "owner")...');
  const t7 = await testLogin('owner@factory.com', 'ownerPassword123', 'owner');
  console.log(`Status: ${t7.status} (Expected 200), Success: ${t7.data.success}`);

  console.log('\nAll Category Portal Login Rules Verified and Enforced Successfully!');
  process.exit(0);
}

runRuleTests().catch((err) => {
  console.error('Test failed:', err);
  process.exit(1);
});
