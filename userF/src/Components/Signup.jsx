import React, { useState } from 'react';
import "../style/Log.css";
import { useNavigate } from 'react-router-dom';
const apiUrl = process.env.REACT_APP_API_URL;

function Signup() {
  // State for name, password, email, and rememberMe
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const [errorMessage, setErrorMessage] = useState(''); // State for error messages
  const [successMessage, setSuccessMessage] = useState(''); // State for success messages

  const jump=useNavigate();

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent the default form submission

    // Create the signup data object
    const signupData = {
      name,
      password,
      email,
      rememberMe
    };

    try {
      // Make a POST request to your signup API endpoint
      const response = await fetch(`${apiUrl}/api/auth/signup`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(signupData)
      });

      // Parse the response
      const result = await response.json();

      if (response.ok) {
        // Handle successful signup
        alert('Signup successful:', result);
        setSuccessMessage('Signup successful! Please log in.'); // Display success message
        setName('');
        setPassword('');
        setEmail('');
        setRememberMe(false);
        jump("/login");
      } else {
        // Handle signup error
        setErrorMessage(result.message || 'Signup failed. Please try again.');
      }
    } catch (error) {
      console.error('Error during signup:', error);
      setErrorMessage('An error occurred. Please try again.');
    }
  };

  return (
    <section>
      <div className="form-box">
        <div className="form-value">
          <form onSubmit={handleSubmit}>
            <h2 className='mt-3'>Signup</h2>
            <div className="inputbox">
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)} // Update name state
                required
              />
              <label>Name</label> {/* Updated label to "Name" */}
            </div>
            <div className="inputbox">
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)} // Update password state
                required
              />
              <label>Password</label>
            </div>
            <div className="inputbox">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)} // Update email state
                required
              />
              <label>Email</label>
            </div>
            <div className="forget">
              <label>
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)} // Update rememberMe state
                />
                Remember Me
                <a href="#">Forget Password</a>
              </label>
            </div>
            <button type="submit">Sign up</button> {/* Submit button */}
            {errorMessage && <p className="error-message">{errorMessage}</p>} {/* Display error messages */}
            {successMessage && <p className="success-message">{successMessage}</p>} {/* Display success messages */}
            <div className="register">
              <p>
                Already have an account? <a href="/login">Login</a>
              </p>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
}

export default Signup;
