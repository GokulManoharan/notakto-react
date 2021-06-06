import React from 'react';
import "../assets/styles/square.css";

const Square = ({ ind,
    rowInd,
    setValue,
    value,
    winner,
    isStraightHorizontal,
    isStraightVertical,
    isLeftDiagonalStrike,
    isRightDiagonalStrike
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
            <div 
            className={`strike-out${(isStraightHorizontal) ? " straight-horizontal" : ""} ${isStraightVertical ? " straight-vertical" : ""} ${isLeftDiagonalStrike ? " diagonal-top-left-to-bottom-right": ""} ${isRightDiagonalStrike ? " diagonal-top-right-to-bottom-left" : ""} `}>

            </div>
            {value}
        </div>
    );
};

export default Square;