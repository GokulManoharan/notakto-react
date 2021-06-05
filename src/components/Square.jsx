import React from 'react';
import "../assets/styles/square.css";

const Square = ({ ind, rowInd, setValue, value }) => {

    const squareClick = _ => {
        if(!value){
            setValue(rowInd, ind)
        }
    }
    return (
        <div className={`${(ind === 1 && rowInd === 2) ? "center-col board-col" :
            (ind === 1) ? "center-col board-col col-border-bottom" :
                rowInd !== 2 ? "board-col col-border-bottom" : "board-col"}`}
            onClick={squareClick}
        >
            {value}
        </div>
    );
};

export default Square;