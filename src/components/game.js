import { useState, useEffect } from 'react';
import Cards from './cards';
import Scores from './scores';
import { shuffle } from '../helpers';
import styled from 'styled-components';

const Button = styled.button`
  width: 100%;
  background: #faf3dd;
  border: 0;
  font-size: 2.5em;
  text-transform: uppercase;
  font-weight: 600;
  color: #0088cc;
  box-shadow: 0 -2px 10px #333;
  cursor: pointer;

  &:focus {
    outline-color: #0088cc;
  }

  &:hover {
    background: #fcf9ed;
    box-shadow: 0 -2px 15px #333;
    color: #007ab8;
  }
`;

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
      {started ? (
        <Button onClick={stopGame(false)}>Reset</Button>
      ) : (
        <Button onClick={startGame()}>Start game</Button>
      )}
      <Scores
        score={score}
        highScore={highScore}
        started={started}
        gameEnd={gameEnd}
      />
      {started && (
        <Cards
          className="container"
          cards={shuffle(cards)}
          incrementScore={incrementScore}
          selectCard={selectCard}
        />
      )}
    </div>
  );
}
export default Game;
