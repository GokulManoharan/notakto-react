import React, { useState, useEffect } from 'react';
import initialPlayerDetails from "./assets/data/playerDetails.json";
import Game from './components/Game';
import SideBar from './components/SideBar';
import {capitalize} from 'lodash';
import './App.css';

const App = _ => {
  // Initializing state values
  const [numberOfBoards, setNumberOfBoards] = useState(0);
  const [value, setValue] = useState("");
  const [player1, setPlayer1] = useState("");
  const [player2, setPlayer2] = useState("");
  const [playerDetails, setPlayerDetails] = useState(initialPlayerDetails);
  const [started, setStarted] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (started && loading) {
      setLoading(false);
    }
  }, [started, loading])

  // Event handlers
  const handleOnChange = e => {
    if (e.target.value <= 8 && e.target.value > 0)
      setValue(e.target.value)
    else
      setValue("")
  };

  const handlePlayer1Change = e => {
    setPlayer1(capitalize(e.target.value))
  } 
  const handlePlayer2Change = e => {
    setPlayer2(capitalize(e.target.value))
  } 

  const handleGo = _ => setNumberOfBoards(value);
  const handleSetPlayerNames = e => {
    e.preventDefault();
    handleGo();
    if (player1 && player2 && value) {
      let details = [...playerDetails].map((detail, ind) => ({
        ...detail,
        name: ind === 0 ? player1 : player2
      }));
      setPlayerDetails(details);
      setLoading(true);
      setTimeout(() => {
        setStarted(true);
      }, 2000)
    }
  }

  const restartGame = () => {
    setNumberOfBoards(0);
    setValue("");
    setPlayer1("");
    setPlayer2("");
    setPlayerDetails(initialPlayerDetails);
    setStarted(false);
  }

  return (
    <div className="App">
      <div className={started ? "sidebar" : ""}>
        {started && <SideBar playerDetails={playerDetails} />}
      </div>
      <div className={started ? "content" : "content-initial"}>
        {
          !started &&
          <h1 style={{
            backgroundColor: "#283046",
            padding: "1rem",
            margin: 0,
            color: "#d0d2d6"
          }}>Notakto - React</h1>
        }

        {/* Get the number of boards and players' names */}
        {
          !started && (
            <form onSubmit={handleSetPlayerNames}>
              <h2>Welcome to the game!</h2>
              <span>Enter the number of boards to be played(1-8)</span>
              <br />
              <input required value={value} type="number" min={1} max={8} onChange={handleOnChange} placeholder="Number of boards" />
              <>
                <div>
                  <span>Enter the player names to proceed</span>
                  <div>
                    <input required value={player1} type="text" onChange={handlePlayer1Change} placeholder="Player1 name" />
                    <input required value={player2} type="text" onChange={handlePlayer2Change} placeholder="Player2 name" />
                    <div>
                      <input type="submit" value="Play" />
                    </div>
                  </div>
                </div>
              </>
            </form>
          )
        }
        
        {/* Start the games if number of boards and player names are */}
        <Game
          playerDetails={playerDetails}
          numberOfBoards={numberOfBoards}
          setPlayerDetails={setPlayerDetails}
          started={started}
          loading={loading}
          restartGame={restartGame}
        />

      </div>
    </div >
  );
}

export default App;
