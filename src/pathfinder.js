import Queue from './queue.js';

let board;
let knight;
let goal;
let visited = [];
let tests = new Queue();

function getShortestPath(chessBoard, knightPiece, start, end) {
    validatePositions(chessBoard, start, end);
    board = chessBoard;
    knight = knightPiece;
    goal = end;
    const path = [start];
    visited.push(start);
    return explore(path);
}

function validatePositions(board, ...positions) {
    if (!board.contains(...positions)) {
        throw new RangeError(
            `Start and end ranks and files must be within [0, ${board.size})`,
        );
    }
}

function explore(path, move) {
    knight.position = path[path.length - 1];

    if (move) {
        knight.applyMove(move);
        path.push(knight.position);
    }

    if (board.samePosition(knight.position, goal)) {
        return path;
    }

    const unexploredMoves = getUnexploredMoves();

    for (const unexploredMove of unexploredMoves) {
        const test = { path: [...path], move: unexploredMove };
        tests.enqueue(test);
    }
}

function getUnexploredMoves() {
    return knight.moveset.filter(move => {
        const newPosition = knight.computePosition(move);

        if (!board.contains(newPosition)) {
            return false;
        }

        const alreadyVisited = visited.some(visitedPosition =>
            board.samePosition(visitedPosition, newPosition),
        );

        return !alreadyVisited;
    });
}

const pathfinder = {
    getShortestPath,
};

export default pathfinder;
