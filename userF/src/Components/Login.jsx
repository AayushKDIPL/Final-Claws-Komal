import React, { useState } from 'react';
import "../style/Log.css";
import { useNavigate } from 'react-router-dom';
const apiUrl = process.env.REACT_APP_API_URL;

const Login = () => {
  // State for email and password
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false); // State for "Remember Me"
  const [errorMessage, setErrorMessage] = useState(''); // State for error messages

  const jump=useNavigate();

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent the default form submission

    // Create the login data object
    const loginData = {
      email,
      password,
      rememberMe
    };

    try {
      // Make a POST request to your login API endpoint
      const response = await fetch(`${apiUrl}/api/auth/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(loginData)
      });

      // Parse the response
      const result = await response.json();

      if (response.ok) {
        // Handle successful login, e.g., redirect to another page
        localStorage.setItem('accessToken', result.message.accesstoken);
        localStorage.setItem('user', result.message.user);
        alert('Login successful:', result);
        jump("/");
        // Redirect or store user token as needed
      } else {
        // Handle login error
        setErrorMessage(result.message || 'Login failed. Please try again.');
      }
    } catch (error) {
      console.error('Error during login:', error);
      setErrorMessage('An error occurred. Please try again.');
    }
  };

  return (
    <section>
      <div className="form-box">
        <div className="form-value">
          <form className='in-box' onSubmit={handleSubmit}>
            <h2>Login</h2>
            <div className="inputbox">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)} // Update email state
                required
              />
              <label>Email</label>
            </div>
            <div className="inputbox">
              <ion-icon name="lock-closed-outline"></ion-icon>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)} // Update password state
                required
              />
              <label>Password</label>
            </div>
            <div className="forget">
              <label>
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)} // Update rememberMe state
                />
                Remember Me
                <a href="#">Forgot Password</a>
              </label>
            </div>
            <button type="submit">Log in</button>
            {errorMessage && <p className="error-message">{errorMessage}</p>} {/* Display error messages */}
            <div className="register">
              <p>
                Don't have an account? <a href="/signup">Register</a>
              </p>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
};

export default Login;
