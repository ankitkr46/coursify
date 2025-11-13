import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../../utils/api";
import './Register.css';

const Register = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [fullName, setFullName] = useState("");
  const navigate = useNavigate();

  async function handleRegister(e) {
    e.preventDefault();
    try {
      const response = await API.post("/users/signup", { username: email, password, name: fullName });
      alert("Registration successful 🎉");
      localStorage.setItem("token", response.data.token);
      localStorage.setItem("role", "user");
      if (fullName) localStorage.setItem('fullName', fullName);
      // notify other components in the same tab that auth changed
      window.dispatchEvent(new Event('auth-changed'));
      navigate("/dashboard");
    } catch (err) {
      console.error(err);
      alert("Registration failed ❌");
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
          required
        />
        <input
          type="text"
          placeholder="Enter full name"
          value={fullName}
          onChange={(e) => setFullName(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Enter Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit">Register</button>
      </form>
    </div>
  );
};

export default Register;
