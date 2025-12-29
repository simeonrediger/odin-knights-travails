import Queue from './queue.js';

let board;
let knight;
let goal;
let positionsExplored;
let visited = new Set();
let tests = new Queue();

function run(chessBoard, knightPiece, start, end) {
    validatePositions(chessBoard, start, end);
    board = chessBoard;
    knight = knightPiece;
    goal = end;
    positionsExplored = 0;
    const encodedStart = encodePosition(start);
    const path = [encodedStart];
    visited.add(encodedStart);
    const shortestPath = explore({ path: encodePath(path) });

    return {
        path: shortestPath,
        moves: shortestPath.length - 1,
        positionsExplored,
    };
}

function encodePosition(coordinates) {
    return coordinates.join(',');
}

function decodePosition(coordinates) {
    return coordinates.split(',').map(n => Number(n));
}

function encodePath(path) {
    return path.join(';');
}

function decodePath(path) {
    return path.split(';');
}

function explore({ path, move }) {
    path = decodePath(path);
    knight.position = decodePosition(path[path.length - 1]);

    if (move) {
        knight.applyMove(move);
        path.push(encodePosition(knight.position));
    }

    positionsExplored++;

    if (board.samePosition(knight.position, goal)) {
        return path;
    }

    const unexploredMoves = getUnexploredMoves();

    for (const unexploredMove of unexploredMoves) {
        const test = { path: encodePath(path), move: unexploredMove };
        tests.enqueue(test);
    }

    return explore(tests.dequeue());
}

function getUnexploredMoves() {
    return knight.moveset.filter(move => {
        const newPosition = knight.computePosition(move);

        if (!board.contains(newPosition)) {
            return false;
        }

        const encodedNewPosition = encodePosition(newPosition);
        const alreadyVisited = visited.has(encodedNewPosition);
        visited.add(encodedNewPosition);
        return !alreadyVisited;
    });
}

function validatePositions(board, ...positions) {
    if (!board.contains(...positions)) {
        throw new RangeError(
            `Start and end ranks and files must be within [0, ${board.size})`,
        );
    }
}

const pathfinder = {
    run,
};

export default pathfinder;
