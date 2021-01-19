import { useState } from 'react';

function Game() {
  const [score, setScore] = useState(null);
  const [started, setStarted] = useState(false);

  function startGame() {
    setStarted(true);
    setScore(0);
  }

  function stopGame() {
    setStarted(false);
    setScore(null);
  }

  if (started) {
    return (
      <div id="game">
        <div id="score">Score: {score}</div>
        <button onClick={stopGame}>Reset</button>
      </div>
    );
  } else {
    return (
      <div id="game">
        <button onClick={startGame}>Start game</button>
      </div>
    );
  }
}

export default Game;
