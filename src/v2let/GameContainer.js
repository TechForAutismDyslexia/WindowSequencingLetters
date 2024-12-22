import React, { useState } from 'react';
import WordSelector from './WordSelector';
import LetCard from './LetCard';

const GameContainer = () => {
  const [gameState, setGameState] = useState({ isGameStarted: false, selectedWords: [] });

  const startGame = (selectedWords) => {
    setGameState({ isGameStarted: true, selectedWords });
  };

  const endGame = () => {
    setGameState({ isGameStarted: false, selectedWords: [] });
  };

  return gameState.isGameStarted ? (
    <LetCard words={gameState.selectedWords} onGameEnd={endGame} />
  ) : (
    <WordSelector onStartGame={startGame} />
  );
};

export default GameContainer;
