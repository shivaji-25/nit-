const jwt = require('jsonwebtoken');
const User = require('../models/User');

// Generate JWT token with expiry
const generateToken = (id) => {
  return jwt.sign(
    { id },
    process.env.JWT_SECRET || 'nit_winter_internship_secret_key_2026_super_secure',
    {
      expiresIn: process.env.JWT_EXPIRES_IN || '7d',
    }
  );
};

// @desc    Login user & return token
// @route   POST /auth/login
// @access  Public
exports.login = async (req, res) => {
  try {
    const { email, password, requiredRole } = req.body;

    // Validate inputs
    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: 'Please provide both email and password',
      });
    }

    // Find user by email and include password field
    const user = await User.findOne({ email }).select('+password');
    if (!user) {
      return res.status(401).json({
        success: false,
        message: 'Invalid email or password',
      });
    }

    // Check if account is active
    if (!user.isActive) {
      return res.status(403).json({
        success: false,
        message: 'Account is deactivated. Contact factory admin.',
      });
    }

    // Check password
    const isMatch = await user.matchPassword(password);
    if (!isMatch) {
      return res.status(401).json({
        success: false,
        message: 'Invalid email or password',
      });
    }

    // Enforce role rule: if login is attempted from a specific category portal link, verify role match
    if (requiredRole && user.role !== requiredRole.toLowerCase()) {
      const displayNames = {
        admin: 'Admin',
        salesman: 'Salesman',
        production: 'Production',
        auditor: 'Auditor & Accounts',
        owner: 'Owner',
      };
      const expected = displayNames[requiredRole.toLowerCase()] || requiredRole;
      return res.status(403).json({
        success: false,
        message: `Access Denied: This link is for ${expected} login only.`,
      });
    }

    // Generate token
    const token = generateToken(user._id);

    res.status(200).json({
      success: true,
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        phone: user.phone,
      },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server error during login',
      error: error.message,
    });
  }
};

// @desc    Get current logged in user
// @route   GET /auth/me
// @access  Private (All authenticated roles)
exports.getMe = async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    res.status(200).json({
      success: true,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        phone: user.phone,
      },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server error retrieving user',
      error: error.message,
    });
  }
};

// @desc    List test logins for evaluation - FR-1.5
// @route   GET /auth/test-users
// @access  Public
exports.getTestUsers = async (req, res) => {
  const testUsers = [
    {
      role: 'admin',
      name: 'Factory Admin',
      email: 'admin@factory.com',
      password: 'adminPassword123',
      description: 'Order verification, invoicing, dispatch, payments & approvals',
    },
    {
      role: 'salesman',
      name: 'Salesman A (Tamil Nadu)',
      email: 'salesman@factory.com',
      password: 'salesPassword123',
      description: 'Mobile-first field order placement & customer order tracking',
    },
    {
      role: 'production',
      name: 'Floor Supervisor',
      email: 'production@factory.com',
      password: 'prodPassword123',
      description: 'Raw material purchases, BOM batches, output & wastage logging',
    },
    {
      role: 'auditor',
      name: 'External Auditor',
      email: 'auditor@factory.com',
      password: 'auditPassword123',
      description: 'Read-only access to sales register, stock ledger, GST & audit logs',
    },
    {
      role: 'owner',
      name: 'Factory Owner',
      email: 'owner@factory.com',
      password: 'ownerPassword123',
      description: 'High-level dashboard, variance alerts, cost per packet & dues',
    },
  ];

  res.status(200).json({
    success: true,
    data: testUsers,
  });
};
