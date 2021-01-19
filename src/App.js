import './App.css';
import { useState, useEffect } from 'react';
import Game from './components/game';

function App() {
  useEffect(() => {
    document.title = 'Memory Game';
  }, []);

  return (
    <div>
      <header>
        <h1>Memory Game</h1>
      </header>
      <main>
        <Game />
      </main>
    </div>
  );
}

export default App;
