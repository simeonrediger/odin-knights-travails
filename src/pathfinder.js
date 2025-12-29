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
    start = new Square(start.x, start.y);
    goal = new Square(end.x, end.y);
    validateSquare(start);
    validateSquare(goal);

    discovered = create2dBitmap(board);
    positionsExplored = 0;

    const firstSquareMatch = explore(start);
    const shortestPathString = getPathString(firstSquareMatch);
    const moveCount = getMoveCount(firstSquareMatch);

    return {
        path: shortestPathString,
        moves: moveCount,
        positionsExplored,
    };
}

function explore(square) {
    positionsExplored++;

    if (board.sameSquare(square, goal)) {
        return square;
    }

    for (const neighbor of getUndiscoveredNeighbors(square)) {
        neighbors.enqueue(neighbor);
        discovered[neighbor.x][neighbor.y] = true;
    }

    return neighbors.size > 0 ? explore(neighbors.dequeue()) : null;
}

function getUndiscoveredNeighbors(square) {
    const neighbors = [];

    for (const move of knight.moveset) {
        const neighbor = new Square(
            square.x + move.x,
            square.y + move.y,
            square,
        );

        const inBounds = board.contains(neighbor.x, neighbor.y);
        const alreadyDiscovered = discovered[neighbor.x]?.[neighbor.y];

        if (inBounds && !alreadyDiscovered) {
            neighbors.push(neighbor);
        }
    }

    return neighbors;
}

function getPathString(square) {
    if (!square) {
        return null;
    }

    let string = '';

    while (square) {
        string = `(${square.x}, ${square.y})` + string;
        square = square.prev;

        if (square) {
            string = ' -> ' + string;
        }
    }

    return string;
}

function getMoveCount(square) {
    if (!square) {
        return null;
    }

    let squareCount = 0;

    while (square) {
        squareCount++;
        square = square.prev;
    }

    return squareCount - 1;
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
