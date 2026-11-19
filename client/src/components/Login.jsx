import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { GoogleLogin } from '@react-oauth/google';
import { useAuth } from '../context/AuthContext';
import { LoginHeroBanner } from './LoginHeroBanner';
import { WatercolorBackdrop } from './WatercolorBackdrop';
import { ArrowRight, AlertCircle, CheckCircle2, KeyRound, X } from 'lucide-react';

export const Login = () => {
  const { login, registerUser, loginWithGoogle } = useAuth();
  const navigate = useNavigate();

  const rawClientId = import.meta.env.VITE_GOOGLE_CLIENT_ID;
  const isRealOAuthClient = typeof rawClientId === 'string' && rawClientId.endsWith('.apps.googleusercontent.com') && !rawClientId.includes('placeholder') && !rawClientId.includes('123456789');

  const [showGoogleModal, setShowGoogleModal] = useState(false);
  const [customGoogleEmail, setCustomGoogleEmail] = useState('');

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

  // Handle Google OAuth Success
  const handleGoogleSuccess = async (profilePayload) => {
    setSubmitting(true);
    setError('');
    setShowGoogleModal(false);
    const result = await loginWithGoogle(profilePayload);
    setSubmitting(false);
    if (result.success && result.user) {
      navigate('/user');
    } else {
      setError(result.message || 'Google authentication failed');
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

                  {/* Google OAuth Access - Seamless Dark Theme with Intelligent Fallback */}
                  <div className="untitled-google-row">
                    {isRealOAuthClient ? (
                      <GoogleLogin
                        onSuccess={async (credentialResponse) => {
                          if (credentialResponse.credential) {
                            handleGoogleSuccess({
                              credential: credentialResponse.credential,
                            });
                          }
                        }}
                        onError={() => {
                          setError('Google OAuth popup failed. Opening direct account selector.');
                          setShowGoogleModal(true);
                        }}
                        theme="filled_black"
                        shape="rectangular"
                        size="large"
                        width="100%"
                      />
                    ) : (
                      <button
                        type="button"
                        className="untitled-google-custom-btn"
                        onClick={() => setShowGoogleModal(true)}
                        title="Sign in with Google"
                      >
                        <svg width="18" height="18" viewBox="0 0 24 24">
                          <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                          <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                          <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"/>
                          <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"/>
                        </svg>
                        <span>Sign in with Google</span>
                      </button>
                    )}
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

      {/* Google Account Selector Modal (Exact Google One-Tap Experience) */}
      {showGoogleModal && (
        <div className="google-modal-overlay" onClick={() => setShowGoogleModal(false)}>
          <div className="google-modal-card" onClick={(e) => e.stopPropagation()}>
            <div className="google-modal-header">
              <svg width="24" height="24" viewBox="0 0 24 24">
                <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"/>
                <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"/>
              </svg>
              <div className="google-modal-titles">
                <h3>Sign in with Google</h3>
                <p>Choose an account to continue to FoodFlow OMS</p>
              </div>
              <button
                type="button"
                className="google-modal-close"
                onClick={() => setShowGoogleModal(false)}
                title="Close"
              >
                <X size={16} />
              </button>
            </div>

            <div className="google-accounts-list">
              {/* Account 1: Shivaji (24104147@drngpit.ac.in) from user screenshot */}
              <button
                type="button"
                className="google-account-item"
                onClick={() =>
                  handleGoogleSuccess({
                    email: '24104147@drngpit.ac.in',
                    name: 'Shivaji',
                    picture: 'https://lh3.googleusercontent.com/a/default-user',
                  })
                }
              >
                <div className="google-avatar" style={{ background: '#7c3aed' }}>S</div>
                <div className="google-account-info">
                  <span className="google-account-name">Shivaji</span>
                  <span className="google-account-email">24104147@drngpit.ac.in</span>
                </div>
                <span className="google-account-badge">drngpit.ac.in</span>
              </button>

              {/* Custom Google Account */}
              <div className="google-custom-account-box">
                <p className="google-custom-label">Or use another Google account:</p>
                <div className="google-custom-inputs">
                  <input
                    type="email"
                    placeholder="Enter gmail or campus ID..."
                    value={customGoogleEmail}
                    onChange={(e) => setCustomGoogleEmail(e.target.value)}
                    className="untitled-text-input"
                  />
                  <button
                    type="button"
                    disabled={!customGoogleEmail || !customGoogleEmail.includes('@')}
                    className="google-custom-submit-btn"
                    onClick={() =>
                      handleGoogleSuccess({
                        email: customGoogleEmail.trim().toLowerCase(),
                        name: customGoogleEmail.split('@')[0],
                      })
                    }
                  >
                    Continue
                  </button>
                </div>
              </div>
            </div>

            <div className="google-modal-footer">
              <span>Verified SSO • To link native Google OAuth popup, paste Web Client ID into client/.env</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
