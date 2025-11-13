import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../../utils/api";
import './Login.css';

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [fullName, setFullName] = useState(""); // optional helper for legacy cases
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  async function handleLogin(e) {
    e.preventDefault();
    if (!email.trim()) return alert('Please enter your email/username');
    if (password.length < 6) return alert('Password must be at least 6 characters');

    setLoading(true);
    try {
      // send credentials in the body (clean and consistent)
      const res = await API.post('/users/login', { username: email.trim(), password });
      const token = res?.data?.token;
      if (!token) throw new Error('Invalid server response');

      localStorage.setItem('token', token);
      localStorage.setItem('role', 'user');
      localStorage.setItem('username', email.trim());

      const serverName = res?.data?.user?.name;
      if (serverName) localStorage.setItem('fullName', serverName);
      else if (fullName) localStorage.setItem('fullName', fullName.trim());

      // notify other components (same-tab)
      window.dispatchEvent(new Event('auth-changed'));
      alert('Login successful');
      navigate('/dashboard');
    } catch (err) {
      const msg = err?.response?.data?.message || err.message || 'Login failed';
      alert(msg);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="login-form">
      <h2>Login</h2>
      <form onSubmit={handleLogin}>
        <input
          type="text"
          placeholder="Email or username"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          disabled={loading}
          required
        />

        {/* optional helper: keep full name input if you want to preserve older UX */}
        <input
          type="text"
          placeholder="Full name (optional)"
          value={fullName}
          onChange={(e) => setFullName(e.target.value)}
          disabled={loading}
        />

        <div className="input-with-toggle">
          <input
            type={showPassword ? 'text' : 'password'}
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            disabled={loading}
            required
            aria-label="Password"
          />
          <button
            type="button"
            className="input-toggle-btn"
            onClick={() => setShowPassword((s) => !s)}
            aria-pressed={showPassword}
            aria-label={showPassword ? 'Hide password' : 'Show password'}
          >
            {showPassword ? 'Hide' : 'Show'}
          </button>
        </div>

        <button type="submit" disabled={loading}>
          {loading ? 'Signing in…' : 'Login'}
        </button>
      </form>

      <div style={{ marginTop: 18, textAlign: 'center' }}>
        New here?{' '}
        <button
          onClick={() => navigate('/register')}
          style={{ background: 'none', border: 'none', color: '#2563eb', cursor: 'pointer', textDecoration: 'underline' }}
        >
          Sign up
        </button>
      </div>
    </div>
  );
};

export default Login;