import React, { useState, useEffect } from 'react';
import Square from './Square';
import { getBoardResults } from "../utils/board";
import initialRows from "../assets/data/boardRows.json";
import "../assets/styles/board.css";

const Board = ({ numberOfBoards, playerDetails, i, setActivePlayer, isPlayer1Active, setPlayerDetails }) => {
    const [rows, setRows] = useState(initialRows);
    const [winner, setWinner] = useState("")

    useEffect(() => {
        checkBoardStatus()
    }, [rows]);

    const setValue = (rowInd, colInd) => {
        setActivePlayer();
        const newRows = [...rows].map((row, i) => {
            if (rowInd === i) {
                const newCols = row.cols.map((col, j) => {
                    if (colInd === j) {
                        return {
                            ...col,
                            value: "X",
                            clickedBy: isPlayer1Active ? playerDetails[0].name : playerDetails[1].name
                        }
                    }
                    return col
                })
                return {
                    cols: newCols
                }
            }
            return row
        })
        setRows(newRows);
    }

    const checkBoardStatus = () => {
        const result = getBoardResults([...rows]);
        if (result) {
            const winner = isPlayer1Active ? playerDetails[0].name : playerDetails[1].name;
            setWinner(winner);
            const updatedPlayerDetails = [...playerDetails].map(player => {
                if(player.name === winner){
                    return {
                        ...player,
                        won : player.won+1
                    }
                }
                return player
            })
            setPlayerDetails(updatedPlayerDetails);
        }
    }

    return (
        <div className='board-wrapper'>
            <h3>
                Board {i + 1} / {numberOfBoards}
            </h3>
            <span>
                {winner && <span>Winner - {winner}</span> } 
            </span>

            <div className="board">
                {
                    rows?.map((row, i) => {
                        return (
                            <div className="board-row">
                                {
                                    row?.cols?.map((col, ind) => {
                                        return (
                                            <Square
                                                ind={ind}
                                                col={col}
                                                rowInd={i}
                                                setValue={setValue}
                                                value={col.value}
                                                winner={winner}
                                            />
                                        )
                                    })
                                }
                            </div>
                        )
                    })
                }
            </div>
        </div>

    );
};

export default Board;