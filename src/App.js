import React, { useState } from 'react';
import AppKeybored from './components/AppKeybored';
import Game100 from './components/Game100';
import './App.css';

const App = () => {
  const [showKeyboard, setShowKeyboard] = useState(false);
  const [showGame, setShowGame] = useState(false);

  const handleShowKeyboard = () => {
    setShowKeyboard(true);
    setShowGame(false);
  };

  const handleShowGame = () => {
    setShowKeyboard(false);
    setShowGame(true);
  };

  return (
    <div className="app-container">
      <h1 className="app-title">Welcome to My Game And Text Editor </h1>
      <div className="navigation-buttons">
        <button onClick={handleShowKeyboard}>Show Keyboard</button>
        <button onClick={handleShowGame}>Show Game</button>
      </div>
      <div className="content">
        {showKeyboard && <AppKeybored />}
        {showGame && <Game100 />}
      </div>
    </div>
  );
};

export default App;
