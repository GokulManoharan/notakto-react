const lines = [
    [0, 1, 2],
    [0, 3, 6],
    [0, 4, 8],
    [3, 4, 5],
    [6, 7, 8],
    [1, 4, 7],
    [2, 5, 8],
    [2, 4, 6]
];

export const getBoardResults = rows => {
    let isBoardDone = false;
    let boardWinner = "";

    let allCols = [];

    rows.forEach(row => allCols.push(row.cols));
    allCols = allCols.flat();

    for (let i = 0; i < lines.length; i++) {
        const [a, b, c] = lines[i];
        if (allCols[a] && allCols[a] === allCols[b] && allCols[b] === allCols[c]) {
            return allCols[a];
        }
    }
    
    return {
        isBoardDone,
        boardWinner
    }
}
