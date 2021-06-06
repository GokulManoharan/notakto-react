import React, { useState, useEffect } from 'react';
import Square from './Square';
import { getBoardResults } from "../utils/board";
import initialRows from "../assets/data/boardRows.json";
import "../assets/styles/board.css";

const Board = ({ numberOfBoards,
    playerDetails,
    i,
    setActivePlayer,
    isPlayer1Active,
    setPlayerDetails,
    setNumOfBoardsDone,
    numOfBoardsDone,
    isReset,
    setIsReset
}) => {
    const [rows, setRows] = useState([...initialRows]);
    const [winner, setWinner] = useState("");
    const [winnerClass, setWinnerClass] = useState("");
    const [horizontalStrikeRowIndex, setHorizontalStrikeRowIndex] = useState("");
    const [verticalStrikeColIndex, setVerticalStrikeColIndex] = useState("");

    useEffect(() => {
        checkBoardStatus()
    }, [rows]);

    useEffect(() => {
        if (isReset) {
            setRows([...initialRows]);
            setWinnerClass("");
            setWinner("");
            setHorizontalStrikeRowIndex("");
            setVerticalStrikeColIndex("")
            setIsReset(false)
        }
    }, [isReset]);

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
        const { className, isBoardDone, horizontalStraightRowIndex, verticalStraightColIndex } = getBoardResults([...rows]);
        if (isBoardDone) {
            const winner = isPlayer1Active ? playerDetails[0].name : playerDetails[1].name;
            setWinner(winner);
            const updatedPlayerDetails = [...playerDetails].map(player => {
                if (player.name === winner) {
                    return {
                        ...player,
                        won: player.won + 1
                    }
                }
                return player
            })
            setPlayerDetails(updatedPlayerDetails);
            setWinnerClass(className);
            setHorizontalStrikeRowIndex(horizontalStraightRowIndex);
            setVerticalStrikeColIndex(verticalStraightColIndex)
            setNumOfBoardsDone(numOfBoardsDone + 1);
        }
    }


    return (
        <div className="board-wrapper">
            <h3>
                Board {i + 1}/{numberOfBoards}
            </h3>
            <span className={winner ? "winner winner-decided" : "winner"}>Winner - {winner || '?'}</span>

            <div className="board" >
                {
                    rows?.map((row, i) => {
                        return (
                            <React.Fragment key={i}>
                                <div className="board-row">
                                    {
                                        row?.cols?.map((col, ind) => {
                                            return (
                                                <React.Fragment key={`${i+ind}`}>
                                                    <Square
                                                        ind={ind}
                                                        col={col}
                                                        rowInd={i}
                                                        setValue={setValue}
                                                        value={col.value}
                                                        winner={winner}
                                                        isStraightHorizontal={i === horizontalStrikeRowIndex}
                                                        isStraightVertical={ind === verticalStrikeColIndex}
                                                        isLeftDiagonalStrike={winnerClass === "diagonal-top-left-to-bottom-right" && ind === i}
                                                        isRightDiagonalStrike={winnerClass === "diagonal-top-right-to-bottom-left" && ind + i === 2}
                                                        winnerClass={winnerClass}
                                                    />
                                                </React.Fragment>
                                            )
                                        })
                                    }
                                </div>
                            </React.Fragment>
                        )
                    })
                }
            </div>
        </div>

    );
};

export default Board;