
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import SignUp from './Authentication/SignUp';
import Login from './Authentication/LogIn';
import EventForm from './Event_Form/Event_Form';
import './App.css';

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/signup" element={<SignUp />} />
          <Route path="/login" element={<Login />} />
          <Route path="/eventform" element={<EventForm />} />
          <Route path="/" element={<SignUp />} />
        </Routes>
      </div>
    </Router>
  );

}

export default App;
