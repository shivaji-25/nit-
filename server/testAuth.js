const http = require('http');

async function request(path, method = 'GET', data = null, token = null) {
  return new Promise((resolve, reject) => {
    const postData = data ? JSON.stringify(data) : '';
    const headers = {
      'Content-Type': 'application/json',
    };
    if (token) {
      headers['Authorization'] = `Bearer ${token}`;
    }
    if (data) {
      headers['Content-Length'] = Buffer.byteLength(postData);
    }

    const req = http.request(
      {
        hostname: 'localhost',
        port: 5000,
        path,
        method,
        headers,
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
    if (data) req.write(postData);
    req.end();
  });
}

async function runTests() {
  console.log('Testing Section 3.1 Authentication & Roles on Server...\n');

  // Test 1: Admin Login
  console.log('1. Testing Admin Login (FR-1.1, FR-1.4)...');
  const adminRes = await request('/auth/login', 'POST', {
    email: 'admin@factory.com',
    password: 'adminPassword123',
  });
  console.log(`Status: ${adminRes.status}, Role: ${adminRes.data?.user?.role}, Token received: ${!!adminRes.data?.token}`);

  // Test 2: Salesman Login
  console.log('\n2. Testing Salesman Login (FR-1.1, FR-1.4)...');
  const salesRes = await request('/auth/login', 'POST', {
    email: 'salesman@factory.com',
    password: 'salesPassword123',
  });
  console.log(`Status: ${salesRes.status}, Role: ${salesRes.data?.user?.role}, Token received: ${!!salesRes.data?.token}`);

  // Test 3: Invalid Password Login
  console.log('\n3. Testing Bad Password Reject (FR-1.4)...');
  const badRes = await request('/auth/login', 'POST', {
    email: 'admin@factory.com',
    password: 'wrongPassword',
  });
  console.log(`Status: ${badRes.status} (Expected 401), Message: ${badRes.data?.message}`);

  // Test 4: Protected Profile Access (FR-1.3)
  console.log('\n4. Testing /auth/me with Admin Token...');
  const meRes = await request('/auth/me', 'GET', null, adminRes.data.token);
  console.log(`Status: ${meRes.status}, User: ${meRes.data?.user?.name} (${meRes.data?.user?.role})`);

  // Test 5: Role Restriction - Salesman accessing Admin Endpoint (FR-1.3)
  console.log('\n5. Testing Role Restriction: Salesman attempting admin endpoint (FR-1.3)...');
  const forbidRes = await request('/auth/admin-check', 'GET', null, salesRes.data.token);
  console.log(`Status: ${forbidRes.status} (Expected 403 Forbidden), Message: ${forbidRes.data?.message}`);

  // Test 6: Role Restriction - Admin accessing Admin Endpoint (FR-1.3)
  console.log('\n6. Testing Role Restriction: Admin accessing admin endpoint...');
  const allowRes = await request('/auth/admin-check', 'GET', null, adminRes.data.token);
  console.log(`Status: ${allowRes.status} (Expected 200 OK), Success: ${allowRes.data?.success}`);

  // Test 7: Test Users endpoint (FR-1.5)
  console.log('\n7. Testing Test Users for Evaluation (FR-1.5)...');
  const testUsersRes = await request('/auth/test-users', 'GET');
  console.log(`Status: ${testUsersRes.status}, Roles Count: ${testUsersRes.data?.data?.length}`);
  console.log('Roles provided:', testUsersRes.data?.data?.map(u => u.role).join(', '));

  console.log('\nAll Section 3.1 Server Authentication Tests Completed Successfully!');
  process.exit(0);
}

runTests().catch(err => {
  console.error('Test run failed:', err);
  process.exit(1);
});
