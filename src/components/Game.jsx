import React, { useState, useEffect } from 'react';
import Board from './Board';
import _ from 'lodash';
import { FadeLoader } from 'react-spinners';
import Pulse from 'react-reveal/Pulse';
import Wobble from 'react-reveal/Wobble';
import { Modal } from 'react-responsive-modal';
import "../assets/styles/game.css";
import 'react-responsive-modal/styles.css';
import "../App.css";

const Game = ({ playerDetails,
    numberOfBoards,
    setPlayerDetails,
    started,
    loading,
    restartGame
}) => {

    const [isPlayer1Active, setIsPlayer1Active] = useState(true);
    const [playerToPlay, setPlayerToPlay] = useState("");
    const [numOfBoardsDone, setNumOfBoardsDone] = useState(0);
    const [isTheGameDone, setIsTheGameDone] = useState(false);
    const [gameWinner, setGameWinner] = useState("");
    const [open, setOpen] = useState(false);
    const [isGameDrawn, setIsGameDrawn] = useState(false);
    const [modalMessage, setModalMessage] = useState("");

    useEffect(() => {
        setPlayerToPlay(playerDetails[0].name);
    }, [started])

    useEffect(() => {
        if (+numOfBoardsDone === +numberOfBoards && +numberOfBoards !== 0) {
            setIsTheGameDone(true);
            setOpen(prev => !prev);
            findTheWinner();
        }
    }, [numOfBoardsDone])

    const setActivePlayer = () => {
        setIsPlayer1Active(prev => !prev);
        setPlayerToPlay(playerDetails[isPlayer1Active ? 1 : 0].name);
    }

    const findTheWinner = () => {
        const result = _.orderBy(playerDetails, ['won'], ['desc']);
        if (result[0].won === result[1].won) {
            setIsGameDrawn(true);
            setModalMessage(`This game is a draw. Wanna play again?`)
        }
        else {
            setModalMessage(`The winner of the game is ${result[0].name}. Congratulations!`)
            setGameWinner(result[0]);
        }
    }

    if (loading) {
        return (
            <div style={{
                display: "flex",
                justifyContent: "center",
                flexDirection: "column",
                alignItems: "center",
                margin: "2rem"
            }}>
                <span>Hold on! The boards are getting ready</span>
                <FadeLoader color={"#283046"} loading={loading} height={25} width={15} radius={50} margin={50} />
            </div>
        )
    }

    return (
        <>
            {
                started &&
                <Pulse>
                    <>
                        {!isTheGameDone &&
                            (
                                <>
                                    <h2 id="lets-play">Let's PLAY!</h2>
                                    <span className="winner">
                                        {playerToPlay}'s turn
                                    </span>
                                </>)
                        }
                    </>
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
                        <Wobble>
                            {
                                isTheGameDone && (
                                    <>
                                        <span className="winner-modal-message">
                                            {modalMessage}
                                        </span>
                                        <div style={{
                                            display: "flex",
                                            justifyContent: "flex-end",
                                            marginTop: "3rem",
                                            marginBottom: "-2rem"
                                        }}>
                                            <div>
                                                <input type="button" value="Go back" className="play-again" onClick={() => {
                                                    restartGame()
                                                    setOpen(false)
                                                    setNumOfBoardsDone(0)
                                                    setIsTheGameDone(false)
                                                }} />
                                            </div>
                                        </div>
                                    </>
                                )
                            }
                        </Wobble>
                    </Modal>
                    <div className="boards-wrapper">
                        {
                            _.range(numberOfBoards).map((_n, i) => <Board
                                setActivePlayer={setActivePlayer}
                                numberOfBoards={numberOfBoards}
                                playerDetails={playerDetails}
                                isPlayer1Active={isPlayer1Active}
                                setPlayerDetails={setPlayerDetails}
                                setNumOfBoardsDone={setNumOfBoardsDone}
                                numOfBoardsDone={numOfBoardsDone}
                                key={i}
                                i={i}
                            />)
                        }
                    </div>
                </Pulse>
            }
        </>
    );
}

export default Game;