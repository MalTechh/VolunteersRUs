import React, { useState } from 'react';
import './SignUp.css'
import { Link } from 'react-router-dom';

const SignUp = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSignUp = () => {
    // Implement sign-up logic here
    console.log('Signing up...');
  };

  return (
    
  <div className="auth-background">
   <div className="signup-container">

    <div className="signup-header-container">
      <div className="signup-header">Sign Up</div>
      <div className="signup-underline"></div>
    </div>

    <div className="signup-inputs">
        <div className="input">
          <label htmlFor="Email">Email</label>
          <input 
          type='text'
          id='Email'
          placeholder='Email'
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
      </div>  
      <div className="signup-submit-container">
        <button className="submit">Create Account</button>
        <p><Link to="/login">Click here to login</Link></p>
      </div>


   </div>
   </div>
  );
};

export default SignUp;
