import { useState } from 'react';
import Card from './card';
import Scores from './scores';
import styled from 'styled-components';

const Cards = styled.div`
  display: grid;
  grid-template-columns: repeat(3, minmax(100px, 1fr));
  grid-gap: 0.5em;

  @media screen and (min-width: 1024px) {
    grid-template-columns: repeat(5, 1fr);
  }
`;

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

  let contents;

  if (started) {
    contents = (
      <>
        <button onClick={stopGame}>Reset</button>
        <Cards>
          {cards.map(({ img, caption }, index) => (
            <Card img={img} caption={caption} key={index} />
          ))}
        </Cards>
      </>
    );
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

export default Game;
