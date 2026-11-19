const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const createBaseUserSchema = (defaultRole = 'user') => {
  const schema = new mongoose.Schema(
    {
      name: {
        type: String,
        required: [true, 'Please provide a name'],
        trim: true,
      },
      username: {
        type: String,
        required: [true, 'Please provide a username'],
        unique: true,
        lowercase: true,
        trim: true,
      },
      email: {
        type: String,
        required: [true, 'Please provide an email'],
        unique: true,
        lowercase: true,
        trim: true,
        match: [
          /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/,
          'Please provide a valid email',
        ],
      },
      password: {
        type: String,
        required: [true, 'Please provide a password'],
        minlength: 6,
        select: false,
      },
      role: {
        type: String,
        required: true,
        default: defaultRole,
      },
      phone: {
        type: String,
        trim: true,
      },
      isActive: {
        type: Boolean,
        default: true,
      },
    },
    {
      timestamps: true,
    }
  );

  // Hash password before saving (Salted hash - FR-1.4)
  schema.pre('save', async function () {
    if (!this.isModified('password')) {
      return;
    }
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
  });

  // Compare password
  schema.methods.matchPassword = async function (enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password);
  };

  return schema;
};

module.exports = createBaseUserSchema;
