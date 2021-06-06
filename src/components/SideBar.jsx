import React from 'react';
import "../assets/styles/sidebar.css";
const SideBar = ({ playerDetails }) => {
    return (
        <div>
            <h1 style={{
                backgroundColor: "#283046",
                padding: "1rem",
                margin: 0,
                color: "#d0d2d6"
            }}>Notakto - React</h1>
            <div className="player-names-container">
                <h2>Score Board</h2>
                <div className="player-details-wrapper">
                    {
                        playerDetails.map((player) => {
                            return (
                                <div className="player-detail">
                                    <span>
                                        {player.name}
                                    </span>
                                    <span>
                                        {`Boards won : ${player.won}`}
                                    </span>
                                </div>
                            )
                        })
                    }
                </div>
            </div>
        </div>
    );
}

export default SideBar;