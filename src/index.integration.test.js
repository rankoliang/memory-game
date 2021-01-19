import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from './App';

const itBehavesLikeANewGame = () => {
  it("has a 'Start game' button", () => {
    expect(
      screen.getByRole('button', { name: 'Start game' })
    ).toBeInTheDocument();
  });

  it('does not display a score', () => {
    expect(screen.queryByText('Score:')).not.toBeInTheDocument();
  });
};

describe('The Game', () => {
  let cards;

  beforeEach(() => {
    cards = [
      { imgSrc: 'https://example.com/example.png', caption: 'Example image' },
    ];
    render(<App cards={cards} />);
  });

  itBehavesLikeANewGame();

  describe('when started', () => {
    beforeEach(() => {
      const startButton = screen.getByRole('button', { name: 'Start game' });
      userEvent.click(startButton);
    });

    it('displays a score of 0', () => {
      expect(screen.getByText('Score: 0')).toBeInTheDocument();
    });

    it('does not have a start button', () => {
      expect(
        screen.queryByRole('button', { name: 'Start game' })
      ).not.toBeInTheDocument();
    });
  });

  describe('when reset', () => {
    beforeEach(() => {
      const startButton = screen.getByRole('button', { name: 'Start game' });
      userEvent.click(startButton);
      const resetButton = screen.getByRole('button', { name: 'Reset' });
      userEvent.click(resetButton);
    });

    itBehavesLikeANewGame();
  });
});
