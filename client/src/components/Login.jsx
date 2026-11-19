import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Factory, Lock, User, Mail, Phone, UserPlus, LogIn, CheckCircle2, AlertCircle } from 'lucide-react';

export const Login = () => {
  const { login, registerUser, loginWithGoogle } = useAuth();
  const navigate = useNavigate();

  // Mode: 'signin' | 'register'
  const [mode, setMode] = useState('signin');

  // Sign in fields
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  // Register fields: (created name, lastname, gmail, password, phone number) with rules
  const [regName, setRegName] = useState('');
  const [regLastName, setRegLastName] = useState('');
  const [regGmail, setRegGmail] = useState('');
  const [regPassword, setRegPassword] = useState('');
  const [regPhone, setRegPhone] = useState('');

  const [error, setError] = useState('');
  const [successMsg, setSuccessMsg] = useState('');
  const [submitting, setSubmitting] = useState(false);

  // Handle Standard User Login
  const handleSignIn = async (e) => {
    e.preventDefault();
    setError('');
    setSuccessMsg('');
    setSubmitting(true);

    const result = await login(username, password, 'user');
    setSubmitting(false);

    if (result.success && result.user) {
      navigate('/user');
    } else {
      setError(result.message);
    }
  };

  // Handle New Account Registration with Rules
  const handleRegister = async (e) => {
    e.preventDefault();
    setError('');
    setSuccessMsg('');

    // Rule 1: First name validation
    if (!regName.trim() || regName.trim().length < 2) {
      setError('Rule violation: First Name must be at least 2 characters long.');
      return;
    }

    // Rule 2: Last name validation
    if (!regLastName.trim()) {
      setError('Rule violation: Last Name is required.');
      return;
    }

    // Rule 3: Gmail/Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(regGmail.trim())) {
      setError('Rule violation: Please enter a valid Gmail / Email address (e.g. name@gmail.com).');
      return;
    }

    // Rule 4: Phone number validation (10 digits)
    const cleanPhone = regPhone.replace(/[^0-9]/g, '');
    if (cleanPhone.length !== 10) {
      setError('Rule violation: Phone number must be exactly 10 digits.');
      return;
    }

    // Rule 5: Password validation (min 6 characters)
    if (regPassword.length < 6) {
      setError('Rule violation: Password must be at least 6 characters long.');
      return;
    }

    setSubmitting(true);
    const result = await registerUser({
      name: regName.trim(),
      lastname: regLastName.trim(),
      email: regGmail.trim().toLowerCase(),
      gmail: regGmail.trim().toLowerCase(),
      phone: cleanPhone,
      password: regPassword,
    });
    setSubmitting(false);

    if (result.success) {
      navigate('/user');
    } else {
      setError(result.message);
    }
  };

  // Handle Google Access (Only on User Login page)
  const handleGoogleAccess = async () => {
    setError('');
    setSubmitting(true);

    // Prompt user for Gmail address to simulate / authenticate Google OAuth
    const googleEmail = window.prompt(
      'Google Account Sign-In (Simulated OAuth):\nEnter your Google / Gmail address:',
      'user@gmail.com'
    );

    if (!googleEmail || !googleEmail.trim()) {
      setSubmitting(false);
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(googleEmail.trim())) {
      setError('Please provide a valid Gmail/Google email address.');
      setSubmitting(false);
      return;
    }

    const defaultName = googleEmail.split('@')[0];
    const result = await loginWithGoogle({
      email: googleEmail.trim().toLowerCase(),
      name: defaultName,
      googleId: 'g_' + Math.random().toString(36).substring(2, 10),
    });

    setSubmitting(false);
    if (result.success) {
      navigate('/user');
    } else {
      setError(result.message);
    }
  };

  return (
    <div className="login-container">
      <div className="login-card">
        {/* Header */}
        <div className="login-header">
          <div className="login-logo-circle">
            <Factory size={32} color="#4f46e5" />
          </div>
          <h2>{mode === 'signin' ? 'User Login' : 'Create New Account'}</h2>
          <p className="subtitle" style={{ fontWeight: 600, color: '#4f46e5' }}>
            {mode === 'signin' ? 'User login only • Stored in user_folder' : 'Stored strictly in user_folder'}
          </p>
        </div>

        {/* Mode Selector Tabs */}
        <div className="auth-mode-switch">
          <button
            type="button"
            className={`mode-btn ${mode === 'signin' ? 'active' : ''}`}
            onClick={() => {
              setMode('signin');
              setError('');
            }}
          >
            <LogIn size={15} />
            <span>Sign In</span>
          </button>
          <button
            type="button"
            className={`mode-btn ${mode === 'register' ? 'active' : ''}`}
            onClick={() => {
              setMode('register');
              setError('');
            }}
          >
            <UserPlus size={15} />
            <span>New Account</span>
          </button>
        </div>

        {/* Error Alert */}
        {error && (
          <div className="error-box">
            <span>{error}</span>
          </div>
        )}

        {/* Success Alert */}
        {successMsg && (
          <div className="success-box" style={{ background: '#ecfdf5', color: '#065f46', padding: '10px 14px', borderRadius: '8px', marginBottom: '16px', border: '1px solid #a7f3d0', fontSize: '13px' }}>
            <span>{successMsg}</span>
          </div>
        )}

        {/* SIGN IN FORM */}
        {mode === 'signin' ? (
          <form onSubmit={handleSignIn} className="login-form">
            <div className="form-group">
              <label>Username</label>
              <div className="input-wrapper">
                <User size={18} className="input-icon" />
                <input
                  type="text"
                  required
                  placeholder="user"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                />
              </div>
            </div>

            <div className="form-group">
              <label>Password</label>
              <div className="input-wrapper">
                <Lock size={18} className="input-icon" />
                <input
                  type="password"
                  required
                  placeholder="••••••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
            </div>

            <button type="submit" disabled={submitting} className="btn-primary">
              {submitting ? 'Verifying...' : 'Sign In'}
            </button>

            {/* Google Access Button - ONLY on User Login */}
            <div className="google-divider">
              <span>OR</span>
            </div>

            <button
              type="button"
              onClick={handleGoogleAccess}
              disabled={submitting}
              className="btn-google"
            >
              <svg width="18" height="18" viewBox="0 0 24 24">
                <path
                  fill="#4285F4"
                  d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                />
                <path
                  fill="#34A853"
                  d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                />
                <path
                  fill="#FBBC05"
                  d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
                />
                <path
                  fill="#EA4335"
                  d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
                />
              </svg>
              <span>Continue with Google</span>
            </button>
          </form>
        ) : (
          /* CREATE NEW ACCOUNT FORM (with rules) */
          <form onSubmit={handleRegister} className="login-form">
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
              <div className="form-group">
                <label>First Name</label>
                <div className="input-wrapper">
                  <User size={16} className="input-icon" />
                  <input
                    type="text"
                    required
                    placeholder="John"
                    value={regName}
                    onChange={(e) => setRegName(e.target.value)}
                  />
                </div>
              </div>

              <div className="form-group">
                <label>Last Name</label>
                <div className="input-wrapper">
                  <User size={16} className="input-icon" />
                  <input
                    type="text"
                    required
                    placeholder="Doe"
                    value={regLastName}
                    onChange={(e) => setRegLastName(e.target.value)}
                  />
                </div>
              </div>
            </div>

            <div className="form-group">
              <label>Gmail / Email</label>
              <div className="input-wrapper">
                <Mail size={16} className="input-icon" />
                <input
                  type="email"
                  required
                  placeholder="name@gmail.com"
                  value={regGmail}
                  onChange={(e) => setRegGmail(e.target.value)}
                />
              </div>
            </div>

            <div className="form-group">
              <label>Phone Number (10 digits)</label>
              <div className="input-wrapper">
                <Phone size={16} className="input-icon" />
                <input
                  type="tel"
                  required
                  maxLength="10"
                  placeholder="9876543210"
                  value={regPhone}
                  onChange={(e) => setRegPhone(e.target.value.replace(/[^0-9]/g, ''))}
                />
              </div>
            </div>

            <div className="form-group">
              <label>Password (min 6 chars)</label>
              <div className="input-wrapper">
                <Lock size={16} className="input-icon" />
                <input
                  type="password"
                  required
                  placeholder="••••••••••••"
                  value={regPassword}
                  onChange={(e) => setRegPassword(e.target.value)}
                />
              </div>
            </div>

            <div className="reg-rules-box">
              <span className="rules-heading">Required Rules:</span>
              <ul>
                <li>Valid First & Last Name</li>
                <li>Valid Gmail / Email format</li>
                <li>Exactly 10-digit Phone Number</li>
                <li>Password of 6+ characters (Salted hash)</li>
                <li>Saved exclusively into <code>user_folder</code></li>
              </ul>
            </div>

            <button type="submit" disabled={submitting} className="btn-primary">
              {submitting ? 'Creating Account...' : 'Create Account'}
            </button>
          </form>
        )}
      </div>
    </div>
  );
};
