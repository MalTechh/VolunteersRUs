import React, { useState } from 'react';
import './LogIn.css'
import { Link } from 'react-router-dom';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = () => {
    // Implement login logic here
    console.log('Logging in...');
  };

  return (
      <div className="auth-background">
       <div className="login-container">
    
        <div className="signup-header-container">
          <div className="signup-header">Login</div>
          <div className="signup-underline"></div>
  
        </div>
    
          <div className="login-inputs">
            <div className="input">
              <label htmlFor="Username">Username</label>
              <input 
              type='text'
              id='Username'
              placeholder='Username'
              required 
              aria-required="true"
              />
            </div>
            
            <div className="input">
              <label htmlFor="Password">Password</label>
              <input 
              type='text'
              id='Password'
              placeholder='Password'
              required 
              aria-required="true"
              />
            </div>
          </div>
          
          <div className="login-submit-container">
            <button className="submit">Login</button>
            <p>Don't have an account? <Link to= "/signup">Click here to sign up</Link></p>
          </div>

          </div>  
       </div>
      );
};

export default Login;
