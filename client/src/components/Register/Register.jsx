import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../../utils/api";
import './Register.css';

const Register = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [fullName, setFullName] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  async function handleRegister(e) {
    e.preventDefault();
    // basic client-side validation
    if (password.length < 6) {
      alert('Password must be at least 6 characters');
      return;
    }
    if (password !== confirmPassword) {
      alert('Passwords do not match');
      return;
    }
    setLoading(true);
    try {
      const response = await API.post("/users/signup", { username: email.trim(), password, name: fullName.trim() });
  localStorage.setItem("token", response.data.token);
  localStorage.setItem("role", "user");
  const serverName = response?.data?.user?.name;
  if (serverName) localStorage.setItem('fullName', serverName);
  else if (fullName) localStorage.setItem('fullName', fullName.trim());
      // notify other components in the same tab that auth changed
      window.dispatchEvent(new Event('auth-changed'));
      navigate("/login");
    } catch (err) {
      console.error(err);
      const msg = err?.response?.data?.message || 'Registration failed';
      alert(msg);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="register-form">
      <h2>Register</h2>
      <form onSubmit={handleRegister}>
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
          required
          disabled={loading}
        />
        <div className="input-with-toggle">
  <input
    type={showPassword ? "text" : "password"}
    placeholder="Enter Password"
    value={password}
    onChange={(e) => setPassword(e.target.value)}
    required
    style={{ width: "100%", paddingRight: "60px" }}
    disabled={loading}
  />

  <button
    type="button"
    className="input-toggle-btn"
    onClick={() => setShowPassword(!showPassword)}
  >
    {showPassword ? "Hide" : "Show"}
  </button>
</div>

        <input
          type={showPassword ? "text" : "password"}
          placeholder="Confirm Password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          required
          disabled={loading}
        />

        <button type="submit" disabled={loading}>{loading ? 'Registering...' : 'Register'}</button>
      </form>
    </div>
  );
};

export default Register;
