import './App.css';
import { useEffect } from 'react';
import ENV from './config';
import Game from './components/game';
import styled from 'styled-components';

const StyledHeader = styled.header`
  text-align: center;
  background: #008dd5;
  padding: 0.4em;

  h1 {
    color: #f6f6f6;
    font-size: 3.5em;
    margin: 0;
  }
`;

function App() {
  useEffect(() => {
    document.title = ENV['title'];
  }, []);

  return (
    <>
      <StyledHeader>
        <h1>{ENV['heading']}</h1>
      </StyledHeader>
      <main>
        <Game cards={ENV['cards']} />
      </main>
    </>
  );
}

export default App;
