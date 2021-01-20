import ENV from '../config';
import { render, screen } from '@testing-library/react';
import Card from './card';
import userEvent from '@testing-library/user-event';

describe('card', () => {
  let onClick;
  let card = ENV['cards'][0];

  beforeEach(() => {
    const { img, caption } = card;
    onClick = jest.fn(() => {});

    render(<Card img={img} caption={caption} cardId={0} onClick={onClick} />);
  });

  describe('when is focused', () => {
    beforeEach(() => {
      userEvent.tab();
    });

    describe('when enter is pressed', () => {
      it('expects the card to have focus', () => {
        expect(
          screen.getByRole('button', { name: card.caption })
        ).toHaveFocus();
      });

      it('calls onClick', () => {
        userEvent.type(document.activeElement, '{Enter}');

        expect(onClick.mock.calls.length).toBe(1);
      });
    });
  });
});
