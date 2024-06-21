
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import SignUp from './Authentication/SignUp';
import Login from './Authentication/LogIn';
import EventForm from './Event_Form/Event_Form';
import UserProfile from './User_Profile/UserProfile.jsx'
import Home from './Homepage/Home.jsx'
import './App.css';

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/signup" element={<SignUp />} />
          <Route path="/login" element={<Login />} />
          <Route path="/eventform" element={<EventForm />} />
          <Route path="/userprofile" element={<UserProfile />} />
          <Route path="/home" element={<Home />} />
        </Routes>
      </div>
    </Router>
  );

}

export default App;
