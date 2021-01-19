import { useState } from 'react';
import Cards from './cards';
import Scores from './scores';

function Game({ cards }) {
  const [score, setScore] = useState(null);
  const [started, setStarted] = useState(false);
  const [highScore, setHighScore] = useState(0);

  function startGame() {
    setStarted(true);
    setScore(0);
  }

  function stopGame() {
    setStarted(false);
    setScore(null);
  }

  function incrementScore() {
    const newScore = score + 1;
    setScore(newScore);

    if (newScore > highScore) {
      setHighScore(newScore);
    }
  }

  const contents = started ? (
    <>
      <button onClick={stopGame}>Reset</button>
      <Cards cards={cards} incrementScore={incrementScore} />
    </>
  ) : (
    <>
      <button onClick={startGame}>Start game</button>
    </>
  );

  return (
    <div id="game">
      <Scores score={score} highScore={highScore} started={started} />
      {contents}
    </div>
  );
}

export default Game;
