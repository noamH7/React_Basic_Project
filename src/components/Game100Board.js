import React, { useState } from 'react'
import styles from '../css/Game100Board.module.css'

const Game100Board = ({ gamer, isEnabled, onTurnEnding, onQuit }) => {
  const [number, setNumber] = useState(Math.floor(Math.random() * 100))
  const [steps, setSteps] = useState(0)
  const [scores, setScores] = useState([])

  const plusOne = () => updateNumber(number + 1)
  const minusOne = () => updateNumber(number - 1)
  const multTwo = () => updateNumber(number * 2)
  const divTwo = () => updateNumber(Math.floor(number / 2))

  const updateNumber = newNumber => {
    if (isEnabled) {
      setNumber(newNumber)
      setSteps(prevSteps => {
        const newSteps = prevSteps + 1
        return newSteps
      })

      if (newNumber === 100) {
        setScores(prevScores => [...prevScores, steps + 1])
      }
      else{
        onTurnEnding();
      }
    }

  }

  const newGame = () => {
    setNumber(Math.floor(Math.random() * 100))
    setSteps(0)
    onTurnEnding();
  }

  let cls = `${styles.GameBoard} ${isEnabled ? styles.enabledBoard : styles.disabledBoard}`;


  return (
    <div className={cls}>
      <h3 className={styles['gamer']}>The Board of {gamer}</h3>
      <p className={styles['number']}>{number}</p>
      <p className={styles['steps']}>steps: {steps}</p>
      {number !== 100 && (
        <div className={styles['actions']}>
          <button className={styles['action']} onClick={plusOne}>
            +1
          </button>
          <button className={styles['action']} onClick={minusOne}>
            -1
          </button>
          <button className={styles['action']} onClick={multTwo}>
            *2
          </button>
          <button className={styles['action']} onClick={divTwo}>
            /2
          </button>
        </div>
      )}
      {number === 100 && (
        <div className={styles['gameOver']}>
          <button onClick={newGame}>New Game</button>
          <button onClick={() => {onQuit(scores)}}>Quit</button>
        </div>
      )}
      <p className={styles['scores']}>scores: {scores.join(', ')}</p>
    </div>
  )
}
export default Game100Board
