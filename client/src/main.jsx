import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { GoogleOAuthProvider } from '@react-oauth/google'
import './index.css'
import App from './App.jsx'

const rawClientId = import.meta.env.VITE_GOOGLE_CLIENT_ID;
const isRealOAuthClient = typeof rawClientId === 'string' && rawClientId.endsWith('.apps.googleusercontent.com');
const GOOGLE_CLIENT_ID = isRealOAuthClient ? rawClientId : '100000000000-placeholder.apps.googleusercontent.com';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <GoogleOAuthProvider clientId={GOOGLE_CLIENT_ID}>
      <App />
    </GoogleOAuthProvider>
  </StrictMode>,
);

