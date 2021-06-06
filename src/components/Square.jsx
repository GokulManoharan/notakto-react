import React from 'react';
import "../assets/styles/square.css";

const Square = ({ ind,
    rowInd,
    setValue,
    value,
    winner,
    isStraightHorizontal,
    isStraightVertical
}) => {

    const squareClick = _ => {
        if (!value && !winner) {
            setValue(rowInd, ind)
        }
    }
    return (
        <div
            className={
                `${(ind === 1 && rowInd === 2) ? "center-col board-col" :
                    (ind === 1) ? "center-col board-col col-border-bottom" :
                        rowInd !== 2 ? "board-col col-border-bottom" : "board-col"}`
            }
            onClick={squareClick}
        >
            <div className={`${(isStraightHorizontal) ? "straight-horizontal" : ""} ${isStraightVertical ? "straight-vertical" : ""}`}>

            </div>
            {value}
        </div>
    );
};

export default Square;