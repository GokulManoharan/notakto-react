import React, { useState } from 'react';
import { Modal } from 'react-responsive-modal';
import "../assets/styles/sidebar.css";

const SideBar = ({ playerDetails, restartGame, activePlayer }) => {
    const [open, setOpen] = useState(false);

    return (
        <div>
            <span style={{
                position: "absolute",
                top: 0,
                left: 0,
                padding: "1rem",
                cursor: "pointer",
                userSelect: "none"
            }}
                onClick={() => setOpen(prev => !prev)}
            >
                {`< Go back`}
            </span>
            <h1 style={{
                backgroundColor: "#283046",
                padding: "1rem",
                margin: 0,
                color: "#d0d2d6"
            }}>Notakto - React</h1>
            <span className="active-player-span">
                {activePlayer}'s turn
            </span>
            <div className="player-names-container">
                <h2>Results</h2>
                <div className="player-details-wrapper">
                    {
                        playerDetails.map((player, i) => {
                            return (
                                <React.Fragment key={player.name + i}>
                                    <div className="player-detail">
                                        <span style={{ fontSize: "1.5rem" }}>
                                            {player.name}
                                        </span>
                                        <span>
                                            Boards won: <span style={{ fontSize: "1.5rem" }}>{player.won}</span>
                                        </span>
                                    </div>
                                </React.Fragment>
                            )
                        })
                    }
                </div>
            </div>
            <Modal
                open={open}
                onClose={() => setOpen(false)}
                center
                classNames={{
                    overlay: 'customOverlay',
                    modal: 'customModal',
                }}
                closeOnEsc={false}
                closeOnOverlayClick={false}
            >
                <span className="winner-modal-message">
                    The game progress may be lost. Want to go back still?
                </span>
                <div style={{
                    display: "flex",
                    justifyContent: "flex-end",
                    marginTop: "3rem",
                    marginBottom: "-2rem"
                }}>
                    <div>
                        <input type="button" value="Yes" className="play-again" onClick={restartGame} />
                        <input type="button" value="No" className="play-again" onClick={() => setOpen(false)} />
                    </div>
                </div>
            </Modal>
        </div>
    );
}

export default SideBar;