export default function getShortestPath(board, knight, start, end) {
    validatePositions(board, start, end);
    knight.position = start;
}

function validatePositions(board, ...positions) {
    if (!board.contains(...positions)) {
        throw new RangeError(
            `Start and end ranks and files must be within [0, ${board.size})`,
        );
    }
}
