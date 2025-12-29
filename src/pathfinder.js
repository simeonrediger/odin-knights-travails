import Queue from './queue.js';
import Square from './square.js';

let board;
let knight;
let goal;
let positionsExplored;
let discovered;
let neighbors = new Queue();

function run(chessBoard, knightPiece, start, end) {
    board = chessBoard;
    knight = knightPiece;
    start = new Square(...start);
    goal = new Square(...end);
    validateSquare(start);
    validateSquare(goal);
    positionsExplored = 0;
    const shortestPath = explore(start);

    return {
        path: shortestPath,
        moves: shortestPath.length - 1,
        positionsExplored,
    };
}

function explore(square) {
    positionsExplored++;

    if (board.sameSquare(square.x, square.y, goal.x, goal.y)) {
        return square;
    }

    const undiscoveredNeighbors = getUndiscoveredNeighbors();

    for (const neighbor of undiscoveredNeighbors) {
        neighbors.enqueue(neighbor);
        discovered.add(neighbor);
    }

    return explore(neighbors.dequeue());
}

function getUndiscoveredNeighbors() {
    return knight.moveset.filter(move => {
        // const newPosition = knight.computePosition(move);

        if (!board.contains(newPosition)) {
            return false;
        }

        const alreadyDiscovered = discovered.has(newPosition);
        return !alreadyDiscovered;
    });
}

function generate2dBitmap(board) {
    const bitmap = new Map();

    for (let x = 0; x < board.size; x++) {
        bitmap.set(x, new Map());

        for (let y = 0; y < board.size; y++) {
            bitmap.get(x).set(y, false);
        }
    }

    return bitmap;
}

function validateSquare(square) {
    if (!board.contains(square.x, square.y)) {
        throw new RangeError(
            `Start and end ranks and files must be within [0, ${board.size})`,
        );
    }
}

const pathfinder = {
    run,
};

export default pathfinder;
