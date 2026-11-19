const jwt = require('jsonwebtoken');
const { getModelByRole, allRoleModels, User } = require('../models');

// Generate JWT token with expiry and role payload
const generateToken = (id, role) => {
  return jwt.sign(
    { id, role },
    process.env.JWT_SECRET || 'nit_winter_internship_secret_key_2026_super_secure',
    {
      expiresIn: process.env.JWT_EXPIRES_IN || '7d',
    }
  );
};

const roleDisplayNames = {
  admin: 'Admin',
  salesman: 'Salesman',
  production: 'Production',
  auditor: 'Auditor & Accounts',
  owner: 'Owner',
  user: 'User',
};

// @desc    Login user & return token (Enforcing separated collection folders)
// @route   POST /auth/login
// @access  Public
exports.login = async (req, res) => {
  try {
    const identifier = req.body.username || req.body.email;
    const { password, requiredRole } = req.body;

    // Validate inputs
    if (!identifier || !password) {
      return res.status(400).json({
        success: false,
        message: 'Please provide both username and password',
      });
    }

    const cleanIdentifier = identifier.trim().toLowerCase();
    let user = null;
    let foundInRole = null;

    if (requiredRole) {
      const targetRoleKey = requiredRole.toLowerCase();
      const TargetModel = getModelByRole(targetRoleKey);

      // Search ONLY inside that role's separated collection folder!
      user = await TargetModel.findOne({
        $or: [{ username: cleanIdentifier }, { email: cleanIdentifier }],
      }).select('+password');

      if (!user) {
        // Check if user exists in another role collection to give clear feedback
        for (const item of allRoleModels) {
          if (item.role !== targetRoleKey) {
            const existsElsewhere = await item.model.findOne({
              $or: [{ username: cleanIdentifier }, { email: cleanIdentifier }],
            });
            if (existsElsewhere) {
              const expectedName = roleDisplayNames[targetRoleKey] || targetRoleKey;
              return res.status(403).json({
                success: false,
                message: `Access Denied: This link is for ${expectedName} login only.`,
              });
            }
          }
        }

        return res.status(401).json({
          success: false,
          message: 'Invalid username or password',
        });
      }
      foundInRole = targetRoleKey;
    } else {
      // General user login - search across role collections
      for (const item of allRoleModels) {
        user = await item.model.findOne({
          $or: [{ username: cleanIdentifier }, { email: cleanIdentifier }],
        }).select('+password');
        if (user) {
          foundInRole = item.role;
          break;
        }
      }

      if (!user) {
        return res.status(401).json({
          success: false,
          message: 'Invalid username or password',
        });
      }
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
        message: 'Invalid username or password',
      });
    }

    // Generate token with role
    const token = generateToken(user._id, user.role);

    res.status(200).json({
      success: true,
      token,
      user: {
        id: user._id,
        name: user.name,
        username: user.username,
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
    const user = req.user;
    res.status(200).json({
      success: true,
      user: {
        id: user._id,
        name: user.name,
        username: user.username,
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
      username: 'admin',
      name: 'Factory Admin',
      email: 'admin@factory.com',
      password: 'adminPassword123',
      collection: 'admin_folder',
    },
    {
      role: 'salesman',
      username: 'salesman',
      name: 'Salesman A (Tamil Nadu)',
      email: 'salesman@factory.com',
      password: 'salesPassword123',
      collection: 'salesman_folder',
    },
    {
      role: 'production',
      username: 'production',
      name: 'Floor Supervisor',
      email: 'production@factory.com',
      password: 'prodPassword123',
      collection: 'production_folder',
    },
    {
      role: 'auditor',
      username: 'auditor',
      name: 'External Auditor',
      email: 'auditor@factory.com',
      password: 'auditPassword123',
      collection: 'auditor_folder',
    },
    {
      role: 'owner',
      username: 'owner',
      name: 'Factory Owner',
      email: 'owner@factory.com',
      password: 'ownerPassword123',
      collection: 'owner_folder',
    },
  ];

  res.status(200).json({
    success: true,
    data: testUsers,
  });
};

// @desc    Register new user account strictly into user_folder - with rules
// @route   POST /auth/register
// @access  Public (User login only)
exports.register = async (req, res) => {
  try {
    const { name, lastname, email, gmail, password, phone, username } = req.body;
    const emailToUse = (email || gmail || '').trim().toLowerCase();
    const cleanPhone = (phone || '').trim().replace(/[^0-9]/g, '');

    // Rule 1: Name validation (First Name)
    if (!name || name.trim().length < 2) {
      return res.status(400).json({
        success: false,
        message: 'First Name is required and must be at least 2 characters long.',
      });
    }

    // Rule 2: Lastname validation
    if (!lastname || lastname.trim().length < 1) {
      return res.status(400).json({
        success: false,
        message: 'Last Name is required.',
      });
    }

    // Rule 3: Email / Gmail validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailToUse || !emailRegex.test(emailToUse)) {
      return res.status(400).json({
        success: false,
        message: 'Please provide a valid email/gmail address (e.g. name@gmail.com).',
      });
    }

    // Rule 4: Phone number validation (10 digits)
    if (!cleanPhone || cleanPhone.length !== 10) {
      return res.status(400).json({
        success: false,
        message: 'Phone number must be exactly 10 digits.',
      });
    }

    // Rule 5: Password validation (min 6 characters)
    if (!password || password.length < 6) {
      return res.status(400).json({
        success: false,
        message: 'Password must be at least 6 characters long.',
      });
    }

    // Determine unique username
    let userUsername = username ? username.trim().toLowerCase() : emailToUse.split('@')[0].toLowerCase();

    // Check if email or username already exists in user_folder
    const existingEmail = await User.findOne({ email: emailToUse });
    if (existingEmail) {
      return res.status(400).json({
        success: false,
        message: 'An account with this email/gmail already exists in user_folder.',
      });
    }

    const existingUsername = await User.findOne({ username: userUsername });
    if (existingUsername) {
      userUsername = `${userUsername}_${Math.floor(100 + Math.random() * 900)}`;
    }

    // Create user strictly inside user_folder collection
    const newUser = await User.create({
      name: name.trim(),
      lastname: lastname.trim(),
      username: userUsername,
      email: emailToUse,
      password,
      phone: cleanPhone,
      role: 'user',
    });

    const token = generateToken(newUser._id, 'user');

    res.status(201).json({
      success: true,
      message: 'New account created successfully in user_folder!',
      token,
      user: {
        id: newUser._id,
        name: newUser.name,
        lastname: newUser.lastname,
        username: newUser.username,
        email: newUser.email,
        phone: newUser.phone,
        role: newUser.role,
      },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server error during registration',
      error: error.message,
    });
  }
};

// @desc    Google OAuth Access (User login only)
// @route   POST /auth/google
// @access  Public
exports.googleAuth = async (req, res) => {
  try {
    const { email, name, googleId } = req.body;
    if (!email) {
      return res.status(400).json({
        success: false,
        message: 'Google authentication did not provide an email address.',
      });
    }

    const cleanEmail = email.trim().toLowerCase();
    let user = await User.findOne({ email: cleanEmail });

    if (!user) {
      const generatedUsername = cleanEmail.split('@')[0].toLowerCase() + `_${Math.floor(100 + Math.random() * 900)}`;
      const randomPassword = Math.random().toString(36).slice(-10) + 'A1!';
      const nameParts = (name || 'Google User').split(' ');

      user = await User.create({
        name: nameParts[0] || 'Google',
        lastname: nameParts.slice(1).join(' ') || 'User',
        username: generatedUsername,
        email: cleanEmail,
        password: randomPassword,
        phone: '0000000000',
        role: 'user',
      });
    }

    const token = generateToken(user._id, 'user');

    res.status(200).json({
      success: true,
      token,
      user: {
        id: user._id,
        name: user.name,
        lastname: user.lastname,
        username: user.username,
        email: user.email,
        phone: user.phone,
        role: user.role,
      },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Google login failed on server',
      error: error.message,
    });
  }
};
