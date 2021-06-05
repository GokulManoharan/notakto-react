import React, { useState } from 'react';
import initialPlayerDetails from "./assets/data/playerDetails.json";
import Game from './components/Game';
import SideBar from './components/SideBar';
import './App.css';

const App = _ => {

  // Initializing state values
  const [numberOfBoards, setNumberOfBoards] = useState(0);
  const [value, setValue] = useState("");
  const [player1, setPlayer1] = useState("");
  const [player2, setPlayer2] = useState("");
  const [playerDetails, setPlayerDetails] = useState(initialPlayerDetails);
  const [started, setStarted] = useState(false);

  // Event handlers
  const handleOnChange = e => {
    if (e.target.value <= 8 && e.target.value > 0)
      setValue(e.target.value)
    else
      setValue("")
  };

  const handlePlayer1Change = e => setPlayer1(e.target.value);
  const handlePlayer2Change = e => setPlayer2(e.target.value);

  const handleGo = _ => setNumberOfBoards(value);
  const handleSetPlayerNames = () => {
    if (player1 && player2) {
      let details = [...playerDetails].map((detail, ind) => ({
        ...detail,
        name: ind === 0 ? player1 : player2
      }));
      setPlayerDetails(details);
      setStarted(true);
    }
  }

  return (
    <div className="App">
      <div className="sidebar">
          <SideBar playerDetails={playerDetails} />
      </div>
      <div className="content">
        <h2>Notakto - React</h2>

        {/* Get the number of boards from the players */}
        {
          !numberOfBoards && (
            <>
              <h5>Please enter the number of boards to be played(1-8)</h5>
              <input value={value} type="number" min={1} max={8} onChange={handleOnChange} placeholder="Number of boards" />
              {

              }
              <input type="button" value="Go" onClick={handleGo} />
            </>
          )
        }

        {/* Get the player names  */}
        {
          (numberOfBoards > 0 && !started) && (
            <>
              <>
                <h5>Please enter the player names to proceed</h5>
                <input value={player1} type="text" onChange={handlePlayer1Change} placeholder="Player1 name" />
                <input value={player2} type="text" onChange={handlePlayer2Change} placeholder="Player2 name" />
                <input type="button" value="Start" onClick={handleSetPlayerNames} />
              </>
              <div>
                <button onClick={() => {
                  setNumberOfBoards(0);
                  setValue(0);
                  setStarted(false);
                }}>
                  Change number of boards
        </button>
              </div>
            </>
          )
        }
        {/* Start the games if number of boards and player names are */}
        {started && <Game 
        playerDetails={playerDetails} 
        numberOfBoards={numberOfBoards}
        setPlayerDetails={setPlayerDetails} 
        />}

      </div>
    </div>
  );
}

export default App;
