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

const types = ["straightHorizontal", "straightVertical", "diagonalTopLeftToBottomRight", "diagonalTopRightToBottomLeft"]

export const getBoardResults = rows => {
    let isBoardDone = false;
    let allCols = [];

    rows.forEach(row => allCols.push(row.cols));
    allCols = allCols.flat();
    for (let i = 0; i < possibilities.length; i++) {
        const [a, b, c] = possibilities[i];
        if (allCols[a].value && allCols[a].value === allCols[b].value && allCols[b].value === allCols[c].value) {
            isBoardDone = true;

        }
    }
    
    return isBoardDone
}
