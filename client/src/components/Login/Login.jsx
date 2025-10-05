import React, { useState } from "react";
import API from "../../utils/api";
import './Login.css';

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  async function handleLogin(e) {
    e.preventDefault();
    try {
      const response = await API.post("/user/login", {}, {
        headers: { username: email, password }
      });
      alert("Login successful ✅");
      localStorage.setItem("token", response.data.token);
    } catch (err) {
      console.error(err);
      alert("Login failed ❌");
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
    </div>
  );
};

export default Login;