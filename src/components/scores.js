function Scores({ score, highScore, started, gameEnd }) {
  let scoreElement = null;

  if (started) {
    scoreElement = <div id="score">Score: {score}</div>;
  } else if (gameEnd) {
    switch (gameEnd.state) {
      case 'game over':
        scoreElement = (
          <div id="score">
            You picked {gameEnd.card.caption} already! Your final score is:{' '}
            {gameEnd.score}
          </div>
        );
        break;
      case 'win':
        scoreElement = (
          <div id="score">You win! Your final score is: {gameEnd.score}</div>
        );
        break;
    }
  }

  return (
    <div id="scores">
      {scoreElement}
      <div id="high-score">High Score: {highScore}</div>
    </div>
  );
}

export default Scores;
