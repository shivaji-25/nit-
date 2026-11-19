import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { GoogleLogin } from '@react-oauth/google';
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

  return (
    <div className="login-container">
      <div className="login-card">
        {/* Header */}
        <div className="login-header">
          <div className="login-logo-circle">
            <Factory size={32} color="#4f46e5" />
          </div>
          <h2>{mode === 'signin' ? 'User Login' : 'Create New Account'}</h2>
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

            {/* Google OAuth Access - ONLY on User Login */}
            <div className="google-divider">
              <span>OR</span>
            </div>

            <div style={{ display: 'flex', justifyContent: 'center', width: '100%', marginTop: '6px' }}>
              <GoogleLogin
                onSuccess={async (credentialResponse) => {
                  if (credentialResponse.credential) {
                    setSubmitting(true);
                    const result = await loginWithGoogle({ credential: credentialResponse.credential });
                    setSubmitting(false);
                    if (result.success) {
                      navigate('/user');
                    } else {
                      setError(result.message);
                    }
                  }
                }}
                onError={() => {
                  setError('Google Login Failed');
                }}
                shape="rectangular"
                theme="outline"
                size="large"
                text="continue_with"
                width="100%"
              />
            </div>
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

            <button type="submit" disabled={submitting} className="btn-primary">
              {submitting ? 'Creating Account...' : 'Create Account'}
            </button>
          </form>
        )}
      </div>
    </div>
  );
};
