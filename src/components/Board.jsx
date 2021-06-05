import React, { useState, useEffect } from 'react';
import Square from './Square';
import { getBoardResults } from "../utils/board";
import initialRows from "../assets/data/boardRows.json";
import "../assets/styles/board.css";

const Board = ({ numberOfBoards, playerDetails }) => {
    const [rows, setRows] = useState(initialRows);
    const [isPlayer1Active, setIsPlayer1Active] = useState(true);
    const [playerToPlay, setPlayerToPlay] = useState(playerDetails[0].name);

    useEffect(() => {
        checkBoardStatus()
    },[rows]);

    const setValue = (rowInd, colInd) => {
        setIsPlayer1Active(prev => !prev);
        setPlayerToPlay(playerDetails[isPlayer1Active ? 1 : 0].name);
        const newRows = [...rows].map((row,i) => {
            if(rowInd === i){
                const newCols = row.cols.map((col, j) => {
                    if(colInd === j){
                        return {
                            ...col,
                            value: "X",
                            clickedBy: isPlayer1Active ? playerDetails[0].name : playerDetails[1].name
                        }
                    }
                    return col
                })
                return {
                    cols : newCols
                }
            }
            return row
        })
        setRows(newRows);
    }

    const checkBoardStatus = () => {
        getBoardResults([...rows]);
    }

    return (
        <div className='board-wrapper'>
            {
                console.log(rows)
            }
            <h3>
                Board 0 / {numberOfBoards}
            </h3>
            <h4>
                {playerToPlay}'s turn
            </h4>
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