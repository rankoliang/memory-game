import ENV from '../config';
import { render, screen } from '@testing-library/react';
import Game from './game';
import userEvent from '@testing-library/user-event';

function getScore(label) {
  const scoreElement = screen.getByText(new RegExp(`^${label}:`));
  const score = scoreElement.textContent.match(
    new RegExp(`^${label}: (\\\d)`)
  )[1];

  return Number(score);
}

describe('a started game', () => {
  beforeEach(() => {
    render(<Game cards={ENV['cards']} />);
    const startButton = screen.getByRole('button', { name: 'Start game' });
    userEvent.click(startButton);
  });

  describe('when a card is picked', () => {
    it('increments the score by 1', () => {
      const cardCaption = ENV['cards'][0].caption;

      expect(() =>
        userEvent.click(screen.getByText(cardCaption))
      ).toChange(() => getScore('Score'), { by: 1 });
    });

    it('increments the high score by 1', () => {
      const cardCaption = ENV['cards'][0].caption;

      expect(() =>
        userEvent.click(screen.getByText(cardCaption))
      ).toChange(() => getScore('High Score'), { by: 1 });
    });

    describe('when another card is picked', () => {
      it('increments the score by 1', () => {
        const cardCaption = ENV['cards'][1].caption;

        userEvent.click(screen.getByText(cardCaption));

        expect(() =>
          userEvent.click(screen.getByText(cardCaption))
        ).toChange(() => getScore('Score'), { by: 1 });
      });

      it('increments the high score by 1', () => {
        const cardCaption = ENV['cards'][1].caption;

        userEvent.click(screen.getByText(cardCaption));

        expect(() =>
          userEvent.click(screen.getByText(cardCaption))
        ).toChange(() => getScore('High Score'), { by: 1 });
      });
    });
  });
});
