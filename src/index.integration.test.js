import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import ENV from './config';
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

  it('displays a max score of 0', () => {
    expect(screen.queryByText('High Score: 0')).toBeInTheDocument();
  });

  it('renders no cards', () => {
    const card = ENV['cards'][0];
    const image = screen.queryByAltText(card.img.alt);
    expect(image).not.toBeInTheDocument();
    expect(screen.queryByText(card.caption)).not.toBeInTheDocument();
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

    it('renders at least one card', () => {
      const card = ENV['cards'][0];
      const image = screen.getByAltText(card.img.alt);
      expect(image).toBeInTheDocument();
      expect(screen.getByText(card.caption)).toBeInTheDocument();
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
