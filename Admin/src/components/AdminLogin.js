import React, { useState } from "react";
import "./AdminLogin.css"; // Import the CSS file
import { useNavigate } from "react-router-dom";
const apiUrl = process.env.REACT_APP_API_URL;

const AdminLogin = () => {
  // State to store input values
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const jump=useNavigate();

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Basic validation: Check if inputs are not empty
    if (!username || !password) {
      setError("Please fill in all fields.");
      return;
    }
    
    // Clear any previous error
    setError("");

    // Mock API call
    try {
      const response = await fetch(`${apiUrl}/api/auth/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email: username, password }),
    });

        // Parse the response
        const result = await response.json();

        if (response.ok) {
            // Handle successful login, e.g., redirect to another page
            localStorage.setItem('accesstoken', result.message.accesstoken);
            localStorage.setItem('Email', result.message.user);
            alert('Login successful:', result);
            jump("/");
            // Redirect or store user token as needed
        }else {
        // Handle login failure
        setError("Invalid username or password.");
      }
    } catch (err) {
      console.error("Error during login:", err);
      setError("An error occurred. Please try again.");
    }
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <h2 className="login-title">Admin Login</h2>
        {error && <p className="error-message">{error}</p>}
        <form className="login-form" onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="username">Username</label>
            <input
              type="text"
              id="username"
              name="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button type="submit" className="login-button">
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default AdminLogin;
