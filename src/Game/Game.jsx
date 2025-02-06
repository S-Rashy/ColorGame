import React, { useState, useEffect } from "react";
import "./Game.css";

const colours = [
  "red", "blue", "green", "yellow", "purple", "orange", 
  "pink", "brown", "cyan", "lime", "magenta", "teal", "indigo", "violet"
];

const shuffleArray = (array) => {
  return [...array].sort(() => Math.random() - 0.5);
};

const Game = () => {
  const [targetColour, setTargetColour] = useState("red");
  const [score, setScore] = useState(0);
  const [status, setStatus] = useState("");
  const [shuffledColours, setShuffledColours] = useState([]);

  useEffect(() => {
    startNewRound();
  }, []);

  const startNewRound = () => {
    const newTarget = colours[Math.floor(Math.random() * colours.length)];
    let newOptions = shuffleArray(colours).slice(0, 6);
    
    if (!newOptions.includes(newTarget)) {
      newOptions[Math.floor(Math.random() * newOptions.length)] = newTarget;
    }
    
    setTargetColour(newTarget);
    setShuffledColours(newOptions);
    setStatus("");
  };

  const startNewGame = () => {
    setScore(0); // Reset the score only when New Game is clicked
    startNewRound();
  };

  const handleGuess = (colour) => {
    if (colour === targetColour) {
      setScore(score + 1);
      setStatus("That's correct! Good job!🎉");
      setTimeout(startNewRound, 500);
    } else {
      setStatus("Wrong, try again! ❌");
    }
  };

  return (
    <div className="game-container">
      <h1 className="game-title">Colour Game</h1>
      <div className="game-instructions" data-testid="gameInstructions">
       <p><span>Instructions:</span> Select the corresponding colour from the options below</p>
      </div>
      <div
        id="colourBox"
        className="colour-box"
        style={{ backgroundColor: targetColour }}
        data-testid="colourBox"
      ></div>
      <div id="colourOptions" className="colour-options">
        {shuffledColours.map((colour, index) => (
          <button
            key={index}
            className="colour-button"
            style={{ backgroundColor: colour }}
            onClick={() => handleGuess(colour)}
            data-testid="colourOption"
          >
          </button>
        ))}
      </div>

      <h3>{status}</h3>

      <p id="score" className="score" data-testid="score">
        Score: {score}
      </p>
      <button
        className="new-game-button"
        onClick={startNewGame}
        data-testid="newGameButton"
      >
        New Game
      </button>
    </div>
  );
};

export default Game;
