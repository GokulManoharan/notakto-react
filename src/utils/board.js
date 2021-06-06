const possibilities = [
    [0, 1, 2],
    [0, 3, 6],
    [0, 4, 8],
    [3, 4, 5],
    [6, 7, 8],
    [1, 4, 7],
    [2, 5, 8],
    [2, 4, 6]
];

const types = {
    "straight-horizontal": [
        [0, 1, 2],[3, 4, 5],[6, 7, 8],
    ],
    "straight-vertical": [
        [0, 3, 6],[1, 4, 7],[2, 5, 8],
    ],
    "diagonal-top-left-to-bottom-right": [
        [0, 4, 8]
    ],
    "diagonal-top-right-to-bottom-left": [
        [2, 4, 6]
    ]
}

export const getBoardResults = rows => {
    let isBoardDone = false;
    let className = "";
    let horizontalStraightRowIndex = "";
    let allCols = [];

    rows.forEach(row => allCols.push(row.cols));
    allCols = allCols.flat();
    for (let i = 0; i < possibilities.length; i++) {
        const [a, b, c] = possibilities[i];
        if (allCols[a].value && allCols[a].value === allCols[b].value && allCols[b].value === allCols[c].value) {
            isBoardDone = true;
            className = findStrikeType([a, b, c]);
            if(className === "straight-horizontal"){
                horizontalStraightRowIndex = (a===0) ? 0 : (a===3) ? 1 : (a===6) ? 2 : "";
            }
        }
    }
    
    return {
        isBoardDone, 
        className,
        horizontalStraightRowIndex
    }
}

const findStrikeType = match => {
    let possibility = '';
    for(let prop in types){
        types[prop].forEach(type => {
            if(JSON.stringify(type) === JSON.stringify(match)){
                possibility = prop;
            }
        })
    }
    return possibility
}
