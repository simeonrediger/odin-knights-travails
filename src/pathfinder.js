import Queue from './queue.js';

let board;
let knight;
let goal;
let visited = [];
let testPaths = new Queue();

function getShortestPath(chessBoard, knightPiece, start, end) {
    validatePositions(chessBoard, start, end);
    board = chessBoard;
    knight = knightPiece;
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

function explore(path, move = [0, 0]) {
    knight.position = path[path.length - 1];
    knight.applyMove(move);

    if (board.samePosition(knight.position, goal)) {
        return path;
    }
}

const pathfinder = {
    getShortestPath,
};

export default pathfinder;
