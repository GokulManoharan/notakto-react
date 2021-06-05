import React from 'react';
import Board from './Board';
import "../assets/styles/games.css"

const Game = ({ playerDetails, numberOfBoards }) => {
    return (
        <>
            <h3>Let's PLAY!</h3>
            <div className="player-names-container">
                {
                    playerDetails.map((player) => {
                        return (
                            <div className="player-detail">
                                <span>
                                  {player.name}
                                </span>
                                <span>
                                    {`Won : ${player.won}`}
                                </span>
                            </div>
                        )
                    })
                }
            </div>
            {
                numberOfBoards.map(board => {
                    return (
                        <Board numberOfBoards={numberOfBoards} playerDetails={playerDetails} />
                    )
                })
            }
        </>
    );
}

export default Game;