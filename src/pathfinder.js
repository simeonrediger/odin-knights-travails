function getShortestPath(board, knight, start, end) {
    validatePositions(board, start, end);
    knight.position = start;
    return test(board, knight, end);
}

function validatePositions(board, ...positions) {
    if (!board.contains(...positions)) {
        throw new RangeError(
            `Start and end ranks and files must be within [0, ${board.size})`,
        );
    }
}

function test(board, knight, end) {}

const pathfinder = {
    getShortestPath,
};

export default pathfinder;
