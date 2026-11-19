import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { GoogleLogin } from '@react-oauth/google';
import { useAuth } from '../context/AuthContext';
import { BrandEmblem } from './BrandEmblem';
import { LoginHeroBanner } from './LoginHeroBanner';
import { ArrowRight, AlertCircle, CheckCircle2 } from 'lucide-react';

export const Login = () => {
  const { login, registerUser, loginWithGoogle } = useAuth();
  const navigate = useNavigate();

  // Mode: 'signin' | 'register'
  const [mode, setMode] = useState('signin');

  // Sign in fields
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(true);

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

  const handleForgotPassword = (e) => {
    e.preventDefault();
    setError('Password reset link has been requested. Contact factory administration to reset.');
  };

  return (
    <div className="auth-split-wrapper">
      {/* Left Form Panel */}
      <div className="auth-form-panel">
        <div className="auth-form-box">
          {/* Brand Emblem Logo */}
          <div className="auth-brand-header">
            <BrandEmblem size={44} />
            <h1 className="auth-heading">
              {mode === 'signin' ? 'Welcome Back !' : 'Create Account'}
            </h1>
            <p className="auth-subheading">
              {mode === 'signin'
                ? 'Please enter your details'
                : 'Please enter your details to register as staff user'}
            </p>
          </div>

          {/* Error Message */}
          {error && (
            <div className="auth-alert-box error">
              <AlertCircle size={16} />
              <span>{error}</span>
            </div>
          )}

          {/* Success Message */}
          {successMsg && (
            <div className="auth-alert-box success">
              <CheckCircle2 size={16} />
              <span>{successMsg}</span>
            </div>
          )}

          {/* SIGN IN FORM */}
          {mode === 'signin' ? (
            <form onSubmit={handleSignIn} className="auth-modern-form">
              <div className="auth-input-group">
                <label>Email Address</label>
                <input
                  type="text"
                  required
                  placeholder="Enter your email or username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="auth-input-field"
                  autoComplete="username"
                />
              </div>

              <div className="auth-input-group">
                <label>Password</label>
                <input
                  type="password"
                  required
                  placeholder="••••••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="auth-input-field"
                  autoComplete="current-password"
                />
              </div>

              {/* Remember Me & Forgot Password Row */}
              <div className="auth-options-row">
                <label className="auth-checkbox-label">
                  <input
                    type="checkbox"
                    checked={rememberMe}
                    onChange={(e) => setRememberMe(e.target.checked)}
                  />
                  <span>Remember me</span>
                </label>
                <a
                  href="#forgot"
                  onClick={handleForgotPassword}
                  className="auth-forgot-link"
                >
                  Forgot Password?
                </a>
              </div>

              {/* Primary Action Button */}
              <button
                type="submit"
                disabled={submitting}
                className="auth-primary-btn"
              >
                <span>{submitting ? 'Signing in...' : 'Login'}</span>
                <ArrowRight size={18} />
              </button>

              {/* Google OAuth Access - ONLY on User Login */}
              <div className="auth-divider">
                <span>OR</span>
              </div>

              <div className="auth-google-wrapper">
                <GoogleLogin
                  onSuccess={async (credentialResponse) => {
                    if (credentialResponse.credential) {
                      setSubmitting(true);
                      const result = await loginWithGoogle({
                        credential: credentialResponse.credential,
                      });
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

              {/* Terms disclaimer */}
              <p className="auth-terms-note">
                By creating an account, you agree to our{' '}
                <a href="#terms">Terms of Service</a> and{' '}
                <a href="#privacy">Privacy Policy</a>
              </p>

              {/* Toggle to Register */}
              <div className="auth-footer-link">
                <span>Don't have an account? </span>
                <button
                  type="button"
                  className="auth-link-btn"
                  onClick={() => {
                    setMode('register');
                    setError('');
                  }}
                >
                  Sign Up
                </button>
              </div>
            </form>
          ) : (
            /* CREATE NEW ACCOUNT FORM (with rules) */
            <form onSubmit={handleRegister} className="auth-modern-form">
              <div className="auth-input-row">
                <div className="auth-input-group">
                  <label>First Name</label>
                  <input
                    type="text"
                    required
                    placeholder="John"
                    value={regName}
                    onChange={(e) => setRegName(e.target.value)}
                    className="auth-input-field"
                  />
                </div>

                <div className="auth-input-group">
                  <label>Last Name</label>
                  <input
                    type="text"
                    required
                    placeholder="Doe"
                    value={regLastName}
                    onChange={(e) => setRegLastName(e.target.value)}
                    className="auth-input-field"
                  />
                </div>
              </div>

              <div className="auth-input-group">
                <label>Gmail / Email</label>
                <input
                  type="email"
                  required
                  placeholder="name@gmail.com"
                  value={regGmail}
                  onChange={(e) => setRegGmail(e.target.value)}
                  className="auth-input-field"
                />
              </div>

              <div className="auth-input-group">
                <label>Phone Number (10 digits)</label>
                <input
                  type="tel"
                  required
                  maxLength="10"
                  placeholder="9876543210"
                  value={regPhone}
                  onChange={(e) => setRegPhone(e.target.value.replace(/[^0-9]/g, ''))}
                  className="auth-input-field"
                />
              </div>

              <div className="auth-input-group">
                <label>Password (min 6 characters)</label>
                <input
                  type="password"
                  required
                  placeholder="••••••••••••"
                  value={regPassword}
                  onChange={(e) => setRegPassword(e.target.value)}
                  className="auth-input-field"
                />
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={submitting}
                className="auth-primary-btn"
              >
                <span>{submitting ? 'Creating Account...' : 'Sign Up'}</span>
                <ArrowRight size={18} />
              </button>

              {/* Terms disclaimer */}
              <p className="auth-terms-note">
                By creating an account, you agree to our{' '}
                <a href="#terms">Terms of Service</a> and{' '}
                <a href="#privacy">Privacy Policy</a>
              </p>

              {/* Toggle to Sign In */}
              <div className="auth-footer-link">
                <span>Already have an account? </span>
                <button
                  type="button"
                  className="auth-link-btn"
                  onClick={() => {
                    setMode('signin');
                    setError('');
                  }}
                >
                  Log In
                </button>
              </div>
            </form>
          )}
        </div>
      </div>

      {/* Right Hero Banner Panel with Pure Lightweight Animated Card */}
      <LoginHeroBanner role="user" />
    </div>
  );
};
