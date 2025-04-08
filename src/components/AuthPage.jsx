import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { 
  login, 
  signInWithGoogle, 
  signInWithTwitter, 
  resetPassword 
} from '../firebase/auth';

const AuthPage = () => {
  const [activeTab, setActiveTab] = useState('login');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [selectedRole, setSelectedRole] = useState('customer');
  
  const { setUser } = useAuth();
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    
    try {
      const userCredential = await login(email, password);
      setUser(userCredential.user);
      navigate(`/${selectedRole}-dashboard`);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleLogin = async () => {
    try {
      const userCredential = await signInWithGoogle();
      setUser(userCredential.user);
      navigate(`/${selectedRole}-dashboard`);
    } catch (err) {
      setError(err.message);
    }
  };

  const handleTwitterLogin = async () => {
    try {
      const userCredential = await signInWithTwitter();
      setUser(userCredential.user);
      navigate(`/${selectedRole}-dashboard`);
    } catch (err) {
      setError(err.message);
    }
  };

  const handlePasswordReset = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    
    try {
      await resetPassword(email);
      setSuccess('Password reset email sent. Check your inbox.');
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-tabs">
        <button 
          onClick={() => setActiveTab('login')} 
          className={activeTab === 'login' ? 'active' : ''}
        >
          Login
        </button>
        <button 
          onClick={() => setActiveTab('reset')} 
          className={activeTab === 'reset' ? 'active' : ''}
        >
          Reset Password
        </button>
      </div>

      <div className="role-selection">
        <label>
          <input
            type="radio"
            value="customer"
            checked={selectedRole === 'customer'}
            onChange={() => setSelectedRole('customer')}
          />
          Customer
        </label>
        <label>
          <input
            type="radio"
            value="staff"
            checked={selectedRole === 'staff'}
            onChange={() => setSelectedRole('staff')}
          />
          Staff
        </label>
        <label>
          <input
            type="radio"
            value="admin"
            checked={selectedRole === 'admin'}
            onChange={() => setSelectedRole('admin')}
          />
          Admin
        </label>
      </div>

      {activeTab === 'login' && (
        <form onSubmit={handleLogin} className="auth-form">
          <h2>Login</h2>
          {error && <div className="error">{error}</div>}
          
          <div className="form-group">
            <label>Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          
          <div className="form-group">
            <label>Password</label>
            <div className="password-input">
              <input
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <button 
                type="button" 
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? 'Hide' : 'Show'}
              </button>
            </div>
          </div>
          
          <button type="submit" disabled={loading}>
            {loading ? 'Loading...' : 'Login'}
          </button>
          
          <div className="social-logins">
            <button type="button" onClick={handleGoogleLogin}>
              Sign in with Google
            </button>
            <button type="button" onClick={handleTwitterLogin}>
              Sign in with Twitter
            </button>
          </div>
        </form>
      )}

      {activeTab === 'reset' && (
        <form onSubmit={handlePasswordReset} className="auth-form">
          <h2>Reset Password</h2>
          {error && <div className="error">{error}</div>}
          {success && <div className="success">{success}</div>}
          
          <div className="form-group">
            <label>Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          
          <button type="submit" disabled={loading}>
            {loading ? 'Sending...' : 'Send Reset Link'}
          </button>
        </form>
      )}
    </div>
  );
};

export default AuthPage;