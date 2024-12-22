import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './WordSelector.css';
import LetCard from './LetCard'; // Import the LetCard component

const WordSelector = () => {
  const [sessions, setSessions] = useState([]); // Store sessions fetched from the API
  const [selectedWords, setSelectedWords] = useState([]); // Store words selected by the user
  const [isGameStarted, setIsGameStarted] = useState(false); // Track game start state
  const [words, setWords] = useState([]);

  const navigate = useNavigate(); // Initialize navigate hook

  // Fetch word sessions from local MongoDB via backend
  useEffect(() => {
    const fetchWordSessions = async () => {
      try {
        const response = await axios.get('http://localhost:4000/api/word-sessions');
        if (Array.isArray(response.data) && response.data.length > 0) {
          setSessions(response.data); // Update sessions state
          const allWords = response.data.reduce((acc, item) => {
            if (item.words && Array.isArray(item.words)) {
              return acc.concat(item.words);
            }
            return acc;
          }, []);
          setWords(allWords); // Update the words state
        } else {
          setWords([]); // Ensure words is reset if data is invalid
        }
      } catch (error) {
        console.error('Error fetching word sessions:', error);
      }
    };

    fetchWordSessions();
  }, []);

  // Handle word selection for the game
  const handleWordSelection = (word) => {
    setSelectedWords((prevSelectedWords) =>
      prevSelectedWords.includes(word)
        ? prevSelectedWords.filter((w) => w !== word) // Deselect word if already selected
        : [...prevSelectedWords, word] // Select word
    );
  };

  // Shuffle selected words
  const shuffleWords = (words) => {
    return [...words].sort(() => Math.random() - 0.5); // Shuffle words randomly
  };

  // Handle starting the game
  const handleStartGame = () => {
    const shuffledWords = shuffleWords(selectedWords);
    setSelectedWords(shuffledWords); // Set shuffled words for the game
    setIsGameStarted(true); // Update game start state
  };

  const handleGameEnd = () => {
    navigate('/'); // Navigate back to home when game ends
  };

  // Render LetCard if the game has started
  if (isGameStarted) {
    return <LetCard words={selectedWords} onGameEnd={handleGameEnd} />;
  }

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-8">
          <h2 className="text-center mb-4">Select Words for the Game</h2>
          <div className="word-selector-container card p-4 rounded">
            <div className="word-list mb-4 d-flex flex-wrap justify-content-center">
              {words.length > 0 ? (
                words.map((word, index) => (
                  <button
                    key={index}
                    className={`word-button ${selectedWords.includes(word) ? 'selected' : ''}`}
                    onClick={() => handleWordSelection(word)}
                  >
                    {word}
                  </button>
                ))
              ) : (
                <p>No words available. Please check the database.</p>
              )}
            </div>
            <button
              className="start-game-btn"
              onClick={handleStartGame}
              disabled={selectedWords.length === 0} // Disable button if no words are selected
            >
              Start Game
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WordSelector;
