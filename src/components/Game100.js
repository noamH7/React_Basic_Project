import React, { useState } from 'react'
import Game100Board from './Game100Board'
import RegisterToGame from './RegisterToGame'
import Top3 from './Top3'
import styles from '../css/Game100.module.css'


const Game100 = () => {
  const [regInProgress, setRegInProgress] = useState(false);
  const [gameInProgress, setGameInProgress] = useState(false);
  const [gamers, setGamers] = useState([]);
  const [turn, setTurn] = useState([]);
  const [currentPlayer, setCurrentPlayer] = useState("");
  const [showTop3, setShowTop3] = useState(false);
  

  const addGamer = (gamer) => {
    if(gamers.includes(gamer)){
      alert("gamer already registered to this game");
    }else{
      setGamers(prev => [...prev, gamer]);
      setRegInProgress(false);
    }
  }

  const startGame = () => {
    setGameInProgress(true);
    const initialTurn = [...gamers];
    setTurn(initialTurn);
    const firstPlayer = initialTurn.shift();
    setCurrentPlayer(firstPlayer);
    
  }

  const swapTurn = (quit) => {
    setTurn(prevTurn => {
      let updatedTurn = [...prevTurn];
      if (!quit) {
        updatedTurn.push(currentPlayer);
      }
      if (updatedTurn.length > 0) {
        const nextPlayer = updatedTurn.shift();
        setCurrentPlayer(nextPlayer);
        
      } else {
        alert("All players ended!");
        reset();
      }
      return updatedTurn;
    });
  }

  const endTurn = () => {
    swapTurn(false);
  }

  const endGame = (scores, index) => {
    const userData = JSON.parse(localStorage.getItem(currentPlayer));
    userData.scores = [...userData.scores, ...scores];
    userData.online = false;
    localStorage.setItem(currentPlayer, JSON.stringify(userData));
    swapTurn(true);
  }

  const reset = () => {
    setRegInProgress(false);
    setGameInProgress(false);
    setGamers([]);
    setTurn([]);
    setCurrentPlayer("");
  }

  return (
    <div className={styles['Game100']}>
      <h1>Get To 100!!!</h1>
      {!gameInProgress && (
        <div className={styles['opening']}>
          <button onClick={() => setRegInProgress(true)}>Add Gamer</button>
          {(gamers.length > 1) && (<button onClick={startGame}>Start Game</button>)}
          {regInProgress && (<RegisterToGame onFinish={addGamer}/>)}
         <div>
            <ul className={styles['gamersList']}>
              {gamers.map((gamer, index) => (
                <li key={index}>{gamer}</li>
              ))}
            </ul>
          </div>
        </div>
      )}
      {gameInProgress && (
        <div className={styles["gameInProgress"]}>
          <div className={styles["gameBoards"]}>
          {gamers.map((gamer, index) => (
            <div key={index}>
              {(turn.includes(gamer) || gamer===currentPlayer) && (
                <Game100Board
                  gamer={gamer}
                  isEnabled={gamer===currentPlayer}
                  onTurnEnding={endTurn}
                  onQuit={(scores) => endGame(scores, index)}
                />
              )}
            </div>
          ))}
          </div>
        </div>
      )}
      <button className={styles["button-top3"]} onClick={() => setShowTop3(prev => !prev)}>Top 3</button>
      {showTop3 && <Top3/>}
    </div>
  );
}

export default Game100;


