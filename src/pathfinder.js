import Queue from './queue.js';
import Square from './square.js';

let board;
let knight;
let goal;
let positionsExplored;
let discovered = new Set();
let tests = new Queue();

function run(chessBoard, knightPiece, start, end) {
    validatePositions(chessBoard, start, end);
    board = chessBoard;
    knight = knightPiece;
    goal = new Square(...end);
    positionsExplored = 0;
    start = new Square(...start);
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
        tests.enqueue(neighbor);
        discovered.add(neighbor);
    }

    return explore(tests.dequeue());
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
