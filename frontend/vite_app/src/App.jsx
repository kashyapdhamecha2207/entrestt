import React from "react";
import "./Login.css";

const Login = () => {
  return (
    <div className="container">
      <h1 className="title">KEEP CALM AND LEARN ENGLISH</h1>
      <div className="login-box">
        <h2 className="login-title">Log In to entrestt.com</h2>
        <input type="text" placeholder="Enter Email Address or Username" className="input-box" />
        <input type="password" placeholder="Enter Password" className="input-box" />
        <p className="forgot-password">Forgot password?</p>
        <button className="login-button">Log In</button>
        <div className="social-login">
          <button className="social-button">Continue with Google</button>
          <button className="social-button">Continue with Facebook</button>
        </div>
        <p className="signup-text">Don’t Have an account? <span className="signup-link">Create One</span></p>
      </div>
    </div>
  );
};

export default Login;
