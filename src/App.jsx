
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import SignUp from './Authentication/SignUp';
import Login from './Authentication/LogIn';
import EventForm from './Event_Form/Event_Form';
import UserProfile from './User_Profile/UserProfile.jsx'
import Home from './Homepage/Home.jsx'
import Notification from './Notification';
import Volunteer_History from './Volunteer_History/Volunteer_History.jsx';
import VolunteerForm from './Volunteer_Form/Volunteer_Form';
import EditProfile from './User_Profile/EditProfile.jsx';
import './App.css';

function App() {
  return (
    <Router>
      <div className="App">
        <Notification />
        <Routes>
          <Route path="/signup" element={<SignUp />} />
          <Route path="/login" element={<Login />} />
          <Route path="/eventform" element={<EventForm />} />      
          <Route path="/userprofile" element={<UserProfile />} />
          <Route path="/editprofile" element={<EditProfile />} />
          <Route path="/home" element={<Home />} />
          <Route path="/volunteerhistory" element={<Volunteer_History />} />
          <Route path="/volunteerform" element={<VolunteerForm />} />
        </Routes>
      </div>
    </Router>
  );

}

export default App;
