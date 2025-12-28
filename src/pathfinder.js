import Queue from './queue.js';

let board;
let goal;
let visited = [];
let testPaths = new Queue();

function getShortestPath(chessBoard, start, end) {
    validatePositions(chessBoard, start, end);
    board = chessBoard;
    goal = end;
    const path = [start];
    return explore(path);
}

function validatePositions(board, ...positions) {
    if (!board.contains(...positions)) {
        throw new RangeError(
            `Start and end ranks and files must be within [0, ${board.size})`,
        );
    }
}

function explore(path) {
    const currentPosition = path[path.length - 1];

    if (board.samePosition(currentPosition, goal)) {
        return path;
    }
}

const pathfinder = {
    getShortestPath,
};

export default pathfinder;
