import { useState, useEffect } from 'react';
import Cards from './cards';
import Scores from './scores';
import { shuffle } from '../helpers';

function Game({ cards }) {
  const [score, setScore] = useState(null);
  const [started, setStarted] = useState(false);
  const [highScore, setHighScore] = useState(0);
  const [gameEnd, setGameEnd] = useState(false);
  const [selectedCards, setSelectedCards] = useState(null);

  function startGame() {
    return () => {
      setStarted(true);
      setScore(0);
      setGameEnd(false);
      setSelectedCards(new Set());
    };
  }

  function stopGame(gameEndState = false) {
    return () => {
      setStarted(false);
      setScore(null);
      setGameEnd(gameEndState);
      setSelectedCards(new Set());
    };
  }

  function selectCard(card) {
    if (selectedCards.has(card)) {
      stopGame({ card, score, state: 'game over' })();
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

  useEffect(() => {
    if (started && selectedCards.size === cards.length) {
      stopGame({ score: cards.length, state: 'win' })();
    }
  }, [started, selectedCards, cards]);

  return (
    <div id="game">
      <Scores
        score={score}
        highScore={highScore}
        started={started}
        gameEnd={gameEnd}
      />
      {started ? (
        <>
          <button onClick={stopGame(false)}>Reset</button>
          <Cards
            cards={shuffle(cards)}
            incrementScore={incrementScore}
            selectCard={selectCard}
          />
        </>
      ) : (
        <>
          <button onClick={startGame()}>Start game</button>
        </>
      )}
    </div>
  );
}
export default Game;
