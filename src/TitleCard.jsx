import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const TitleCard = ({ onNameSubmit }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [isSignIn, setIsSignIn] = useState(true);
  const navigate = useNavigate();

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  const handleSubmit = () => {
    if (isSignIn) {
      if (!name || !email || !password || !confirmPassword) {
        setErrorMessage('All fields are required!');
        return;
      }
      if (!emailRegex.test(email)) {
        setErrorMessage('Please enter a valid email address!');
        return;
      }
      if (password !== confirmPassword) {
        setErrorMessage('Passwords do not match!');
        return;
      }
    } else {
      if (!email || !password) {
        setErrorMessage('Email and Password are required!');
        return;
      }
    }
    setErrorMessage('');
    onNameSubmit(name, email, password);
    navigate('/bucketList');
  };

  return (
    <div className="overlay">
      <div className="card">
        <h2>{isSignIn ? 'Sign In' : 'Login'}</h2>
        {isSignIn && (
          <input
            type="text"
            placeholder="Enter your name"
            className="input"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        )}
        <input
          type="text"
          placeholder="Enter your email"
          className="input"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Enter your password"
          className="input"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        {isSignIn && (
          <input
            type="password"
            placeholder="Confirm your password"
            className="input"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
        )}
        {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
        <button onClick={handleSubmit} className="button">
          {isSignIn ? 'Sign Up' : 'Log In'}
        </button>
        <button onClick={() => setIsSignIn((prev) => !prev)} className="button toggle-button">
          {isSignIn ? 'Switch to Login' : 'Switch to Sign In'}
        </button>
      </div>
    </div>
  );
};

export default TitleCard;
