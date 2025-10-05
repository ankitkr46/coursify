import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../../utils/api";
import './Login.css';

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  async function handleLogin(e) {
    e.preventDefault();
    try {
      const response = await API.post("/user/login", {}, {
        headers: { username: email, password }
      });
      localStorage.setItem("token", response.data.token);
      alert("Login successful ✅");
      setError("");
      navigate("/dashboard");
    } catch (err) {
      setError("User not found. Please sign up first.");
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
          required
        />
        <input
          type="password"
          placeholder="Enter Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit">Login</button>
      </form>
      {error && <div style={{ color: "red", marginTop: "12px" }}>{error}</div>}
      <div style={{ marginTop: "18px", textAlign: "center" }}>
        If you are new, <span style={{ color: "#2563eb", cursor: "pointer", textDecoration: "underline" }} onClick={() => navigate("/register")}>Sign up here</span>
      </div>
    </div>
  );
};

export default Login;