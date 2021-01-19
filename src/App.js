import './App.css';
import { useEffect } from 'react';
import ENV from './config';
import Game from './components/game';

function App() {
  useEffect(() => {
    document.title = ENV['title'];
  }, []);

  return (
    <div className="container">
      <header>
        <h1>{ENV['heading']}</h1>
      </header>
      <main>
        <Game cards={ENV['cards']} />
      </main>
    </div>
  );
}

export default App;
