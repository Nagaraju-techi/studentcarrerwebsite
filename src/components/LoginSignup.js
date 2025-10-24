import React, { useState } from 'react';
import { FaUser, FaEnvelope, FaLock } from 'react-icons/fa';
import './LoginSignup.css';

const LoginSignup = ({ onLogin }) => {
  const [isLogin, setIsLogin] = useState(true);
  const [loginData, setLoginData] = useState({ email: '', password: '', rememberMe: false });
  const [signupData, setSignupData] = useState({ name: '', email: '', password: '', confirmPassword: '' });
  const [errors, setErrors] = useState({});

  const validateEmail = (email) => {
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@(([^<>()[\]\\.,;:\s@"]+\.)+[^<>()[\]\\.,;:\s@"]{2,})$/i;
    return re.test(String(email).toLowerCase());
  };

  const validateLogin = () => {
    const newErrors = {};
    if (!loginData.email) newErrors.loginEmail = 'Email is required';
    else if (!validateEmail(loginData.email)) newErrors.loginEmail = 'Invalid email format';
    if (!loginData.password) newErrors.loginPassword = 'Password is required';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const validateSignup = () => {
    const newErrors = {};
    if (!signupData.name) newErrors.signupName = 'Name is required';
    if (!signupData.email) newErrors.signupEmail = 'Email is required';
    else if (!validateEmail(signupData.email)) newErrors.signupEmail = 'Invalid email format';
    if (!signupData.password) newErrors.signupPassword = 'Password is required';
    if (!signupData.confirmPassword) newErrors.signupConfirmPassword = 'Confirm password is required';
    else if (signupData.password !== signupData.confirmPassword)
      newErrors.signupConfirmPassword = "Passwords don't match";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleLoginChange = (e) => {
    const { name, value, type, checked } = e.target;
    setLoginData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSignupChange = (e) => {
    const { name, value } = e.target;
    setSignupData(prev => ({ ...prev, [name]: value }));
  };

  const handleLoginSubmit = (e) => {
    e.preventDefault();
    if (validateLogin()) {
      // instead of alert, call onLogin()
      if (onLogin) onLogin();
    }
  };

  const handleSignupSubmit = (e) => {
    e.preventDefault();
    if (validateSignup()) {
      // after successful signup, directly log them in
      if (onLogin) onLogin();
    }
  };

  return (
    <div className="login-signup-container">
      <div className="form-wrapper">
        <h2 className="form-title">
          {isLogin ? 'Login to Your Account' : 'Create a New Account'}
        </h2>

        {isLogin ? (
          <form onSubmit={handleLoginSubmit} noValidate>
            <div className="input-group">
              <div className="input-wrapper">
                <FaEnvelope className="input-icon" />
                <input
                  type="email"
                  name="email"
                  placeholder="Email"
                  value={loginData.email}
                  onChange={handleLoginChange}
                  className={`form-input ${errors.loginEmail ? 'error' : ''}`}
                />
              </div>
              {errors.loginEmail && <p className="error-message">{errors.loginEmail}</p>}
            </div>

            <div className="input-group">
              <div className="input-wrapper">
                <FaLock className="input-icon" />
                <input
                  type="password"
                  name="password"
                  placeholder="Password"
                  value={loginData.password}
                  onChange={handleLoginChange}
                  className={`form-input ${errors.loginPassword ? 'error' : ''}`}
                />
              </div>
              {errors.loginPassword && <p className="error-message">{errors.loginPassword}</p>}
            </div>

            <div className="form-options">
              <label className="checkbox-label">
                <input
                  type="checkbox"
                  name="rememberMe"
                  checked={loginData.rememberMe}
                  onChange={handleLoginChange}
                  className="checkbox-input"
                />
                <span className="checkbox-text">Remember Me</span>
              </label>

              <button type="button" className="forgot-password">Forgot Password?</button>

            </div>

            <button type="submit" className="submit-button">Login</button>

            <p className="toggle-text">
              Don't have an account?{' '}
              <button
                type="button"
                onClick={() => { setErrors({}); setIsLogin(false); }}
                className="toggle-button"
              >
                Sign Up
              </button>
            </p>
          </form>
        ) : (
          <form onSubmit={handleSignupSubmit} noValidate>
            <div className="input-group">
              <div className="input-wrapper">
                <FaUser className="input-icon" />
                <input
                  type="text"
                  name="name"
                  placeholder="Name"
                  value={signupData.name}
                  onChange={handleSignupChange}
                  className={`form-input ${errors.signupName ? 'error' : ''}`}
                />
              </div>
              {errors.signupName && <p className="error-message">{errors.signupName}</p>}
            </div>

            <div className="input-group">
              <div className="input-wrapper">
                <FaEnvelope className="input-icon" />
                <input
                  type="email"
                  name="email"
                  placeholder="Email"
                  value={signupData.email}
                  onChange={handleSignupChange}
                  className={`form-input ${errors.signupEmail ? 'error' : ''}`}
                />
              </div>
              {errors.signupEmail && <p className="error-message">{errors.signupEmail}</p>}
            </div>

            <div className="input-group">
              <div className="input-wrapper">
                <FaLock className="input-icon" />
                <input
                  type="password"
                  name="password"
                  placeholder="Password"
                  value={signupData.password}
                  onChange={handleSignupChange}
                  className={`form-input ${errors.signupPassword ? 'error' : ''}`}
                />
              </div>
              {errors.signupPassword && <p className="error-message">{errors.signupPassword}</p>}
            </div>

            <div className="input-group">
              <div className="input-wrapper">
                <FaLock className="input-icon" />
                <input
                  type="password"
                  name="confirmPassword"
                  placeholder="Confirm Password"
                  value={signupData.confirmPassword}
                  onChange={handleSignupChange}
                  className={`form-input ${errors.signupConfirmPassword ? 'error' : ''}`}
                />
              </div>
              {errors.signupConfirmPassword && <p className="error-message">{errors.signupConfirmPassword}</p>}
            </div>

            <button type="submit" className="submit-button">Sign Up</button>

            <p className="toggle-text">
              Already have an account?{' '}
              <button
                type="button"
                onClick={() => { setErrors({}); setIsLogin(true); }}
                className="toggle-button"
              >
                Login
              </button>
            </p>
          </form>
        )}
      </div>
    </div>
  );
};

export default LoginSignup;
