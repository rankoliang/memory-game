import { useState } from 'react';
import Cards from './cards';
import Scores from './scores';

function Game({ cards }) {
  const [score, setScore] = useState(null);
  const [started, setStarted] = useState(false);
  const [highScore, setHighScore] = useState(0);
  const [gameOver, setGameOver] = useState(false);
  const [selectedCards, setSelectedCards] = useState(null);

  function startGame() {
    return () => {
      setStarted(true);
      setScore(0);
      setGameOver(false);
      setSelectedCards(new Set());
    };
  }

  function stopGame(gameOver = false) {
    return () => {
      setStarted(false);
      setScore(null);
      setGameOver(gameOver);
      setSelectedCards(new Set());
    };
  }

  function selectCard(card) {
    if (selectedCards.has(card)) {
      stopGame({ card, score })();
    } else {
      incrementScore();
      setSelectedCards(new Set([...selectedCards, card]));
    }
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
      <button onClick={stopGame(false)}>Reset</button>
      <Cards
        cards={cards}
        incrementScore={incrementScore}
        selectCard={selectCard}
      />
    </>
  ) : (
    <>
      <button onClick={startGame()}>Start game</button>
    </>
  );

  return (
    <div id="game">
      <Scores
        score={score}
        highScore={highScore}
        started={started}
        gameOver={gameOver}
      />
      {contents}
    </div>
  );
}

export default Game;
