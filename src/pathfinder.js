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

    const undiscoveredNeighbors = getUndiscoveredNeighbors(square);

    for (const neighbor of undiscoveredNeighbors) {
        neighbors.enqueue(neighbor);
        discovered[neighbor.x][neighbor.y] = true;
    }

    return explore(neighbors.dequeue());
}

function getUndiscoveredNeighbors(square) {
    return knight.moveset.filter(move => {
        const neighbor = new Square(
            square.x + move.x,
            square.y + move.y,
            square,
        );

        if (!board.contains(neighbor.x, neighbor.y)) {
            return false;
        }

        const alreadyDiscovered = discovered[neighbor.x][neighbor.y];
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
