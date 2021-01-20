import styled from 'styled-components';
import { useState, useEffect, useRef } from 'react';

const StyledScores = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: #565264;
  width: 100vw;
  font-size: 3em;
  color: white;
  padding: 0.25em;
`;

const StyledBaseScore = styled.div`
  text-transform: uppercase;
  font-weight: bold;
`;

const StyledScore = styled(StyledBaseScore)`
  ${({ animate }) =>
    animate &&
    `animation: correct-answer 0.2s;

    @keyframes correct-answer {
      0% {
        color: #00a878;
      }
      100% {
        color: white;
      }
    }`}
`;

const StyledHighScore = styled(StyledBaseScore)`
  font-weight: inherit;
  font-size: 0.5em;
`;

const StyledGameOver = styled(StyledBaseScore)`
  font-size: 0.75em;
  animation: game-over 0.2s;
  text-align: center;

  .game-over {
    font-size: 3em;
  }

  .message {
    font-weight: 500;
  }

  @keyframes game-over {
    0% {
      color: red;
    }
    100% {
      color: white;
    }
  } ;
`;

const StyledWinMessage = styled(StyledBaseScore)`
  text-align: center;
  font-size: 4em;
  margin-bottom: 0.1em;

  .score-message {
    font-size: 0.3em;
  }

  animation: correct-answer 0.2s;

  @keyframes correct-answer {
    0% {
      color: #00a878;
    }
    100% {
      color: white;
    }
  }
`;

function Scores({ score, highScore, started, gameEnd }) {
  let scoreElement = null;
  let scoreEl = useRef(null);
  let [scoreAnimate, setScoreAnimate] = useState(started);

  if (started) {
    scoreElement = (
      <StyledScore animate={scoreAnimate} ref={scoreEl}>
        Score: {score}
      </StyledScore>
    );
  } else if (gameEnd) {
    switch (gameEnd.state) {
      case 'game over':
        scoreElement = (
          <StyledGameOver>
            <div className="game-over">Game Over!</div>
            <div className="message">
              You picked {gameEnd.card.caption} already.
            </div>
            <div className="message">Your final score is {gameEnd.score}</div>
          </StyledGameOver>
        );
        break;
      case 'win':
        scoreElement = (
          <StyledWinMessage animate="true">
            <div className="win-message">You win!</div>
            <div className="score-message">
              Your final score is {gameEnd.score}
            </div>
          </StyledWinMessage>
        );
        break;
    }
  }

  useEffect(() => {
    if (score > 0) {
      setScoreAnimate(true);
      scoreEl.current.onanimationend = () => {
        setScoreAnimate(false);
      };
    }
  }, [score]);

  useEffect(() => {
    if (started) {
      setScoreAnimate(false);
    }
  }, [started]);

  return (
    <StyledScores id="scores">
      {scoreElement}
      <StyledHighScore>High Score: {highScore}</StyledHighScore>
    </StyledScores>
  );
}

export default Scores;
