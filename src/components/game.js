import { useState } from 'react';

function Game() {
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

  let contents;

  if (started) {
    contents = <button onClick={stopGame}>Reset</button>;
  } else {
    contents = <button onClick={startGame}>Start game</button>;
  }

  return (
    <div id="game">
      <Scores score={score} highScore={highScore} started={started} />
      {contents}
    </div>
  );
}

function Scores({ score, highScore, started }) {
  return (
    <div id="scores">
      {started && <div id="score">Score: {score}</div>}
      <div id="high-score">High Score: {highScore}</div>
    </div>
  );
}

export default Game;
