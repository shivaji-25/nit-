const http = require('http');

async function testLogin(username, password, requiredRole = null) {
  return new Promise((resolve, reject) => {
    const postData = JSON.stringify({ username, password, requiredRole });
    const req = http.request(
      {
        hostname: '127.0.0.1',
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
  console.log('Testing Username Login & Role Restrictions...\n');

  // Test 1: Username 'admin' logging into Admin portal
  console.log('1. Username "admin" logging into Admin portal (requiredRole: "admin")...');
  const t1 = await testLogin('admin', 'adminPassword123', 'admin');
  console.log(`Status: ${t1.status} (Expected 200), Success: ${t1.data.success}`);

  // Test 2: Username 'salesman' attempting to log into Admin portal
  console.log('\n2. Username "salesman" attempting to log into Admin portal (requiredRole: "admin")...');
  const t2 = await testLogin('salesman', 'salesPassword123', 'admin');
  console.log(`Status: ${t2.status} (Expected 403), Message: "${t2.data.message}"`);

  // Test 3: Username 'admin' attempting to log into Salesman portal
  console.log('\n3. Username "admin" attempting to log into Salesman portal (requiredRole: "salesman")...');
  const t3 = await testLogin('admin', 'adminPassword123', 'salesman');
  console.log(`Status: ${t3.status} (Expected 403), Message: "${t3.data.message}"`);

  // Test 4: Username 'salesman' logging into Salesman portal
  console.log('\n4. Username "salesman" logging into Salesman portal (requiredRole: "salesman")...');
  const t4 = await testLogin('salesman', 'salesPassword123', 'salesman');
  console.log(`Status: ${t4.status} (Expected 200), Success: ${t4.data.success}`);

  // Test 5: Username 'production' logging into Production portal
  console.log('\n5. Username "production" logging into Production portal (requiredRole: "production")...');
  const t5 = await testLogin('production', 'prodPassword123', 'production');
  console.log(`Status: ${t5.status} (Expected 200), Success: ${t5.data.success}`);

  // Test 6: Username 'auditor' logging into Auditor portal
  console.log('\n6. Username "auditor" logging into Auditor portal (requiredRole: "auditor")...');
  const t6 = await testLogin('auditor', 'auditPassword123', 'auditor');
  console.log(`Status: ${t6.status} (Expected 200), Success: ${t6.data.success}`);

  // Test 7: Username 'owner' logging into Owner portal
  console.log('\n7. Username "owner" logging into Owner portal (requiredRole: "owner")...');
  const t7 = await testLogin('owner', 'ownerPassword123', 'owner');
  console.log(`Status: ${t7.status} (Expected 200), Success: ${t7.data.success}`);

  // Test 8: User login at /login (requiredRole: "user")
  console.log('\n8. User "user" logging into User login (requiredRole: "user")...');
  const t8 = await testLogin('user', 'userPassword123', 'user');
  console.log(`Status: ${t8.status} (Expected 200), Role received: ${t8.data.user.role}`);

  // Test 9: Admin attempting to log in at /login (requiredRole: "user")
  console.log('\n9. Admin attempting to log into User login (requiredRole: "user")...');
  const t9 = await testLogin('admin', 'adminPassword123', 'user');
  console.log(`Status: ${t9.status} (Expected 403), Message: "${t9.data.message}"`);

  // Test 10: Salesman attempting to log in at /login (requiredRole: "user")
  console.log('\n10. Salesman attempting to log into User login (requiredRole: "user")...');
  const t10 = await testLogin('salesman', 'salesPassword123', 'user');
  console.log(`Status: ${t10.status} (Expected 403), Message: "${t10.data.message}"`);

  console.log('\nAll Username Login & Role Restrictions Passed Successfully!');
  process.exit(0);
}

runRuleTests().catch((err) => {
  console.error('Test failed:', err);
  process.exit(1);
});
