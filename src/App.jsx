import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import TitleCard from './TitleCard';
import Home from './Home';
import BucketList from './BucketList';
import CompletedBucketList from './CompletedBucketList';
import './index.css';

function App() {
  const [username, setUsername] = useState('');
  const [showDialog, setShowDialog] = useState(true);

  const handleNameSubmit = async (name, email, password) => {
    try {
      const formData = new FormData();
      formData.append("name", name);
      formData.append("email", email);
      formData.append("password", password);
  
      const response = await fetch(
        "https://script.google.com/macros/s/AKfycbxk0_K_0ZTA6-Qkis502HMqCAlqDkIzlRmdM0gNBXRq8XrldxagCAxfgIn2DbjuB8Nk/exec",
        {
          method: "POST",
          body: formData,
        }
      );
  
      const result = await response.json();
      console.log("Success:", result);
  
      if (result.status === "success") {
        setUsername(name);
        setShowDialog(false);
      } else {
        throw new Error(result.message);
      }
    } catch (error) {
      console.error("Error:", error);
      alert("An error occurred: " + error.message);
    }
  };
  

  return (
    <Router>
      <div className="app-layout">
        <div className="sidebar">
          {username && <h1 style={{ textAlign: 'center', color: 'white' }}>Hello, {username}!</h1>}
          {showDialog && <TitleCard onNameSubmit={handleNameSubmit} />}
          <Home />
        </div>
        <div className="main-content">
          <Routes>
            <Route path="/" element={<Navigate to="/bucketList" />} />
            <Route path="/bucketList" element={<BucketList />} />
            <Route path="/completedBucketList" element={<CompletedBucketList />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
