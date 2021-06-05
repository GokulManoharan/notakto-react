import React from 'react';

const SideBar = ({ playerDetails }) => {
    return (
        <div className="player-names-container">
            <h4>Score Board</h4>
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
    );
}

export default SideBar;