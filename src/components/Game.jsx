import React, { useState } from 'react';
import Board from './Board';
import _ from 'lodash';
import "../assets/styles/game.css"

const Game = ({ playerDetails, numberOfBoards, setPlayerDetails }) => {

    const [isPlayer1Active, setIsPlayer1Active] = useState(true);
    const [playerToPlay, setPlayerToPlay] = useState(playerDetails[0].name);

    const setActivePlayer = () => {
        setIsPlayer1Active(prev => !prev);
        setPlayerToPlay(playerDetails[isPlayer1Active ? 1 : 0].name);
    }

    return (
        <>
            <h3>Let's PLAY!</h3>            
            <h4>
                {playerToPlay}'s turn
            </h4>
            <div className="boards-wrapper">
                {
                    _.range(numberOfBoards).map((_n, i) => <Board
                        setActivePlayer={setActivePlayer}
                        numberOfBoards={numberOfBoards}
                        playerDetails={playerDetails}
                        isPlayer1Active={isPlayer1Active}
                        setPlayerDetails={setPlayerDetails}
                        key={i}
                        i={i}
                    />)
                }
            </div>
        </>
    );
}

export default Game;