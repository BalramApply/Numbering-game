import React, { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [numCards, setNumCards] = useState("");
  const [cards, setCards] = useState([]);
  const [allOpened, setAllOpened] = useState(false);

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
  };

  const toggleCardNumber = (index) => {
    const newCards = [...cards];
    newCards[index].showNumber = !newCards[index].showNumber;
    setCards(newCards);
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
