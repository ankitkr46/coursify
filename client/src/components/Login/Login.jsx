import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../../utils/api";
import './Login.css';

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [fullName, setFullName] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  async function handleLogin(e) {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      const response = await API.post("/users/login", {}, {
        headers: { username: email.trim(), password }
      });
      const token = response?.data?.token;
      if (!token) throw new Error('Invalid response from server');
      localStorage.setItem("token", token);
      localStorage.setItem("role", "user");
      localStorage.setItem('username', email.trim());
      if (fullName) localStorage.setItem('fullName', fullName.trim());
      // notify same-tab listeners
      window.dispatchEvent(new Event('auth-changed'));
      alert("Login successful ✅");
      setError("");
      navigate("/dashboard");
    } catch (err) {
      const msg = err?.response?.data?.message || err.message || 'Login failed';
      setError(msg);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="login-form">
      <h2>Login</h2>
      <form onSubmit={handleLogin}>
        <input
          type="email"
          placeholder="Enter Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          disabled={loading}
          required
        />
        <input
          type="text"
          placeholder="Enter full name"
          value={fullName}
          onChange={(e) => setFullName(e.target.value)}
          disabled={loading}
        />
        <div style={{ position: "relative", width: "100%" }}>
  <input
    type={showPassword ? "text" : "password"}
    placeholder="Enter Password"
    value={password}
    onChange={(e) => setPassword(e.target.value)}
    disabled={loading}
    required
    style={{ width: "100%", paddingRight: "60px" }}
  />

  <button
    type="button"
    onClick={() => setShowPassword(!showPassword)}
    style={{
      position: "absolute",
      right: "10px",
      top: "50%",
      transform: "translateY(-50%)",
      background: "none",
      border: "none",
      color: "#007bff",
      cursor: "pointer",
      width: 'auto',
      padding: '6px 8px',
      height: '36px',
      display: 'inline-flex',
      alignItems: 'center',
      justifyContent: 'center',
      borderRadius: '4px',
  zIndex: 2,
    }}
  >
    {showPassword ? "Hide" : "Show"}
  </button>
</div>

        <button type="submit" disabled={loading}>{loading ? 'Signing in...' : 'Login'}</button>
      </form>
      {error && <div style={{ color: "red", marginTop: "12px" }}>{error}</div>}
      <div style={{ marginTop: "18px", textAlign: "center" }}>
        If you are new, <span style={{ color: "#2563eb", cursor: "pointer", textDecoration: "underline" }} onClick={() => navigate("/register")}>Sign up here</span>
      </div>
    </div>
  );
};

export default Login;