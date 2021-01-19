function Scores({ score, highScore, started }) {
  return (
    <div id="scores">
      {started && <div id="score">Score: {score}</div>}
      <div id="high-score">High Score: {highScore}</div>
    </div>
  );
}

export default Scores;
