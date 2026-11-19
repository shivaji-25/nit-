const express = require('express');
const router = express.Router();
const { login, getMe, getTestUsers } = require('../controllers/authController');
const { protect, authorize } = require('../middleware/auth');

// Public routes
router.post('/login', login);
router.get('/test-users', getTestUsers);

// Protected routes (All logged-in users)
router.get('/me', protect, getMe);

// Role verification test route (Admin only)
router.get('/admin-check', protect, authorize('admin'), (req, res) => {
  res.status(200).json({
    success: true,
    message: 'Authorized! Admin privileges confirmed.',
    user: req.user,
  });
});

module.exports = router;
