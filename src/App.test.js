import { render, screen } from '@testing-library/react';
import App from './App';
import ENV from './config';
jest.mock('./config');

describe('App', () => {
  beforeEach(() => {
    render(<App />);
  });

  it('has the title specified in the config', () => {
    expect(document.title).toBe(ENV['title']);
  });

  it('has a heading specified in the config', () => {
    expect(
      screen.getByRole('heading', {
        name: ENV['heading'],
      })
    ).toBeInTheDocument();
  });
});
