import { render, screen } from '@testing-library/react';
import App from './App';

describe('App', () => {
  beforeEach(() => {
    render(<App />);
  });

  it("has the title of 'Memory Game'", () => {
    expect(document.title).toBe('Memory Game');
  });

  it("has a heading containing 'Memory Game'", () => {
    expect(screen.getByRole('heading')).toHaveTextContent('Memory Game');
  });
});
