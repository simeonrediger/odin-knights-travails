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

    discovered = create2dBitmap(board);
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

function create2dBitmap(board) {
    return new Array(board.size).fill(new Array(board.size).fill(false));
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
