import sound1 from "./assets/sound1.mp3";
import sound2 from "./assets/sound2.mp3";
import React, { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [numCards, setNumCards] = useState("");
  const [cards, setCards] = useState([]);
  const [allOpened, setAllOpened] = useState(false);

  function play1(){
    new Audio(sound1).play()
  }
  function play2(){
    new Audio(sound2).play()
  }
  const handleChange = (e) => {
    setNumCards(e.target.value);
  };

  const generateUniqueRandomNumbers = (count) => {
    const numbers = new Set();
    while (numbers.size < count) {
      numbers.add(Math.floor(Math.random() * numCards) + 1);
    }
    return Array.from(numbers);
  };

  const generateCards = () => {
    const randomNumbers = generateUniqueRandomNumbers(numCards);
    const newCards = randomNumbers.map((number) => ({
      number,
      showNumber: false,
    }));
    setCards(newCards);
    setAllOpened(false);
    play2();
  };

  const toggleCardNumber = (index) => {
    const newCards = [...cards];
    if (!newCards[index].showNumber) {
      newCards[index].showNumber = true;
      setCards(newCards);
      play1();
    }
  };

  useEffect(() => {
    const opened = cards.every(card => card.showNumber);
    setAllOpened(opened);
  }, [cards]);

  return (
    <div className="App">
      <h1>Numbering Game</h1>
      <div>
        <input type="number" value={numCards} onChange={handleChange} />
        <button onClick={generateCards} disabled={!allOpened}>
          Generate Numbering
        </button>
      </div>
      <div className="card-container">
        {cards.map((card, index) => (
          <div
            className={`card ${card.showNumber ? 'card-opened' : ''}`}
            key={index}
            onClick={() => toggleCardNumber(index)}
          >
            {card.showNumber ? card.number : String.fromCharCode(65 + index)}
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
