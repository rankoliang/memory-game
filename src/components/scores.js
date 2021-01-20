function Scores({ score, highScore, started, gameOver }) {
  let scoreElement = null;

  if (started) {
    scoreElement = <div id="score">Score: {score}</div>;
  } else if (gameOver) {
    scoreElement = (
      <div id="score">You picked Example 1 already! Your final score is: 0</div>
    );
  }

  return (
    <div id="scores">
      {scoreElement}
      <div id="high-score">High Score: {highScore}</div>
    </div>
  );
}

export default Scores;
