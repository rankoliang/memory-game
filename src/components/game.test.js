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

const cardCaptions = ENV['cards'].map((card) => card.caption);

describe('a started game', () => {
  beforeEach(() => {
    render(<Game cards={ENV['cards']} />);
    const startButton = screen.getByRole('button', { name: 'Start game' });
    userEvent.click(startButton);
  });

  it('focuses the reset button', () => {
    expect(screen.getByRole('button', { name: 'Reset' })).toHaveFocus();
  });

  describe('when the user tabs', () => {
    it('focuses each card in order', () => {
      cardCaptions.forEach((caption) => {
        userEvent.tab();

        expect(document.activeElement).toHaveTextContent(caption);
      });
    });
  });

  describe('when a card is picked', () => {
    it('increments the score by 1', () => {
      expect(() =>
        userEvent.click(screen.getByText(cardCaptions[0]))
      ).toChange(() => getScore('Score'), { by: 1 });
    });

    it('increments the high score by 1', () => {
      expect(() =>
        userEvent.click(screen.getByText(cardCaptions[0]))
      ).toChange(() => getScore('High Score'), { by: 1 });
    });

    describe('when another card is picked', () => {
      it('increments the score by 1', () => {
        userEvent.click(screen.getByText(cardCaptions[0]));

        expect(() =>
          userEvent.click(screen.getByText(cardCaptions[1]))
        ).toChange(() => getScore('Score'), { by: 1 });
      });

      it('increments the high score by 1', () => {
        userEvent.click(screen.getByText(cardCaptions[0]));

        expect(() =>
          userEvent.click(screen.getByText(cardCaptions[1]))
        ).toChange(() => getScore('High Score'), { by: 1 });
      });
    });

    describe('when the same card is picked', () => {
      let initialScore;

      beforeEach(() => {
        userEvent.click(screen.getByText(cardCaptions[0]));

        initialScore = getScore('Score');
      });

      it('ends the game', () => {
        userEvent.click(screen.getByText(cardCaptions[0]));

        expect(
          screen.getByText(
            `You picked ${cardCaptions[0]} already! Your final score is: ${initialScore}`
          )
        ).toBeInTheDocument();
      });

      it('Does not increment the high score', () => {
        expect(() =>
          userEvent.click(screen.getByText(cardCaptions[0]))
        ).not.toChange(() => getScore('High Score'));
      });

      it("renders the 'Start Game' button", () => {
        userEvent.click(screen.getByText(cardCaptions[0]));

        expect(screen.getByRole('button', { name: 'Start game' }));
      });
    });
  });

  describe('when every card is picked', () => {
    beforeEach(() => {
      cardCaptions.forEach((caption) => {
        userEvent.click(screen.getByText(caption));
      });
    });

    it('is won', () => {
      expect(screen.getByText(/win/)).toBeInTheDocument();
    });

    it('does not render any card', () => {
      expect(
        cardCaptions.map((caption) => screen.queryByText(caption))
      ).not.toHaveAnyValue();
    });

    it('does not render a score', () => {
      expect(screen.queryByText(/^Score:/)).not.toBeInTheDocument();
    });
  });
});
