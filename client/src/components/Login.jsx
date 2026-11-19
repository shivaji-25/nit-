import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { GoogleLogin } from '@react-oauth/google';
import { useAuth } from '../context/AuthContext';
import { LoginHeroBanner } from './LoginHeroBanner';
import { WatercolorBackdrop } from './WatercolorBackdrop';
import { ArrowRight, AlertCircle, CheckCircle2, KeyRound } from 'lucide-react';

export const Login = () => {
  const { login, registerUser, loginWithGoogle } = useAuth();
  const navigate = useNavigate();

  // Mode: 'signin' | 'register' | 'forgot'
  const [mode, setMode] = useState('signin');

  // Sign in fields
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [resetEmail, setResetEmail] = useState('');

  // Register fields (name, lastname, email, password, phone)
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

  // Handle Register Account
  const handleRegister = async (e) => {
    e.preventDefault();
    setError('');
    setSuccessMsg('');

    if (!regName.trim() || regName.trim().length < 2) {
      setError('First Name must be at least 2 characters.');
      return;
    }
    if (!regLastName.trim()) {
      setError('Last Name is required.');
      return;
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(regGmail.trim())) {
      setError('Please enter a valid Gmail / Email address.');
      return;
    }
    const cleanPhone = regPhone.replace(/[^0-9]/g, '');
    if (cleanPhone.length !== 10) {
      setError('Phone number must be exactly 10 digits.');
      return;
    }
    if (regPassword.length < 6) {
      setError('Password must be at least 6 characters long.');
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

  // Handle Password Reset Magic Link
  const handleResetSubmit = (e) => {
    e.preventDefault();
    setError('');
    if (!resetEmail.trim()) {
      setError('Please enter your email address.');
      return;
    }
    setSuccessMsg(`Magic reset link dispatched to ${resetEmail}. Check your inbox.`);
  };

  return (
    <div className="untitled-auth-viewport">
      {/* Scenic Watercolor Landscape Backdrop */}
      <WatercolorBackdrop />

      {/* Floating Untitled UI Card Window (Jordan Hughes Design) */}
      <div className="untitled-floating-card">
        {/* Left Form Column (Deep Matte Charcoal) */}
        <div className="untitled-form-col">
          {/* Top Brand Logo */}
          <div className="untitled-brand-row">
            <div className="untitled-logo-cube">❖</div>
            <span className="untitled-brand-name">Untitled UI</span>
            <span className="untitled-brand-sub">FoodFlow OMS</span>
          </div>

          <div className="untitled-form-inner">
            {/* Error & Success Notification Banners */}
            {error && (
              <div className="untitled-alert error">
                <AlertCircle size={14} />
                <span>{error}</span>
              </div>
            )}
            {successMsg && (
              <div className="untitled-alert success">
                <CheckCircle2 size={14} />
                <span>{successMsg}</span>
              </div>
            )}

            {/* 1. SIGN IN MODE */}
            {mode === 'signin' && (
              <>
                <div className="untitled-text-header">
                  <h1 className="untitled-title">Sign into your account</h1>
                  <p className="untitled-subtitle">New gigs personalized for you are waiting.</p>
                </div>

                <form onSubmit={handleSignIn} className="untitled-form-fields">
                  <div className="untitled-field-group">
                    <label>Email</label>
                    <input
                      type="text"
                      required
                      placeholder="Enter your email"
                      value={username}
                      onChange={(e) => setUsername(e.target.value)}
                      className="untitled-text-input"
                      autoComplete="username"
                    />
                  </div>

                  <div className="untitled-field-group">
                    <label>Password</label>
                    <input
                      type="password"
                      required
                      placeholder="••••••••"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="untitled-text-input"
                      autoComplete="current-password"
                    />
                  </div>

                  <div className="untitled-meta-row">
                    <button
                      type="button"
                      className="untitled-link-subtle"
                      onClick={() => {
                        setMode('forgot');
                        setError('');
                        setSuccessMsg('');
                      }}
                    >
                      Forgot password?
                    </button>
                  </div>

                  <button
                    type="submit"
                    disabled={submitting}
                    className="untitled-submit-btn"
                  >
                    <span>{submitting ? 'Signing in...' : 'Sign in'}</span>
                  </button>

                  {/* Google OAuth Access - Seamless Dark Theme */}
                  <div className="untitled-google-row">
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
                      onError={() => setError('Google OAuth Login Failed')}
                      theme="filled_black"
                      shape="rectangular"
                      size="large"
                      width="100%"
                    />
                  </div>

                  <div className="untitled-alt-links">
                    <span>Can't sign in? </span>
                    <button
                      type="button"
                      className="untitled-link-bold"
                      onClick={() => setMode('forgot')}
                    >
                      Reset password
                    </button>
                  </div>
                </form>

                <div className="untitled-bottom-switch">
                  <span>Don't have an account? </span>
                  <button
                    type="button"
                    className="untitled-link-underline"
                    onClick={() => {
                      setMode('register');
                      setError('');
                      setSuccessMsg('');
                    }}
                  >
                    Sign up
                  </button>
                </div>
              </>
            )}

            {/* 2. PASSWORD RESET MODE (From media_1795111712804_d9b58b27.png) */}
            {mode === 'forgot' && (
              <>
                <div className="untitled-text-header">
                  <h1 className="untitled-title">Reset your password</h1>
                  <p className="untitled-subtitle">Enter the email address you used to sign up.</p>
                </div>

                <form onSubmit={handleResetSubmit} className="untitled-form-fields">
                  <div className="untitled-field-group">
                    <label>Email</label>
                    <input
                      type="email"
                      required
                      placeholder="Enter your email"
                      value={resetEmail}
                      onChange={(e) => setResetEmail(e.target.value)}
                      className="untitled-text-input"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={submitting}
                    className="untitled-submit-btn"
                  >
                    <span>Send magic link</span>
                  </button>
                </form>

                <div className="untitled-bottom-switch">
                  <span>Don't have an account? </span>
                  <button
                    type="button"
                    className="untitled-link-underline"
                    onClick={() => {
                      setMode('signin');
                      setError('');
                      setSuccessMsg('');
                    }}
                  >
                    Sign in
                  </button>
                </div>
              </>
            )}

            {/* 3. REGISTER MODE */}
            {mode === 'register' && (
              <>
                <div className="untitled-text-header">
                  <h1 className="untitled-title">Create your account</h1>
                  <p className="untitled-subtitle">Join FoodFlow OMS as staff user.</p>
                </div>

                <form onSubmit={handleRegister} className="untitled-form-fields">
                  <div className="untitled-input-pair">
                    <div className="untitled-field-group">
                      <label>First Name</label>
                      <input
                        type="text"
                        required
                        placeholder="Jordan"
                        value={regName}
                        onChange={(e) => setRegName(e.target.value)}
                        className="untitled-text-input"
                      />
                    </div>
                    <div className="untitled-field-group">
                      <label>Last Name</label>
                      <input
                        type="text"
                        required
                        placeholder="Hughes"
                        value={regLastName}
                        onChange={(e) => setRegLastName(e.target.value)}
                        className="untitled-text-input"
                      />
                    </div>
                  </div>

                  <div className="untitled-field-group">
                    <label>Email</label>
                    <input
                      type="email"
                      required
                      placeholder="name@gmail.com"
                      value={regGmail}
                      onChange={(e) => setRegGmail(e.target.value)}
                      className="untitled-text-input"
                    />
                  </div>

                  <div className="untitled-field-group">
                    <label>Phone Number (10 digits)</label>
                    <input
                      type="tel"
                      required
                      maxLength="10"
                      placeholder="9876543210"
                      value={regPhone}
                      onChange={(e) => setRegPhone(e.target.value.replace(/[^0-9]/g, ''))}
                      className="untitled-text-input"
                    />
                  </div>

                  <div className="untitled-field-group">
                    <label>Password (min 6 chars)</label>
                    <input
                      type="password"
                      required
                      placeholder="••••••••"
                      value={regPassword}
                      onChange={(e) => setRegPassword(e.target.value)}
                      className="untitled-text-input"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={submitting}
                    className="untitled-submit-btn"
                  >
                    <span>Sign up</span>
                  </button>
                </form>

                <div className="untitled-bottom-switch">
                  <span>Already have an account? </span>
                  <button
                    type="button"
                    className="untitled-link-underline"
                    onClick={() => {
                      setMode('signin');
                      setError('');
                      setSuccessMsg('');
                    }}
                  >
                    Sign in
                  </button>
                </div>
              </>
            )}
          </div>
        </div>

        {/* Right Column: Untitled UI Scenic Showcase */}
        <LoginHeroBanner role="user" />
      </div>
    </div>
  );
};
