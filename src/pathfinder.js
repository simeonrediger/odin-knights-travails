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

    positionsExplored = 0;
    discovered = create2dBitmap(board);
    discover(start);

    const firstSquareMatch = search(start, goal);
    const shortestPathString = getPathString(firstSquareMatch);
    const moveCount = getMoveCount(firstSquareMatch);

    return {
        path: shortestPathString,
        moves: moveCount,
        positionsExplored,
    };
}

// Searches breadth-first for goal square from start square
// Returns a retraceable vertex (square) if reachable; else null
function search(start, goal) {
    let square = start;

    while (square) {
        positionsExplored++;

        if (board.sameSquare(square, goal)) {
            return square;
        }

        for (const neighbor of getUndiscoveredNeighbors(square)) {
            neighbors.enqueue(neighbor);
            discover(neighbor);
        }

        square = neighbors.dequeue();
    }

    return null;
}

function getUndiscoveredNeighbors(square) {
    const neighbors = [];

    for (const move of knight.moveset) {
        const neighbor = new Square(
            square.x + move.x,
            square.y + move.y,
            square,
        );

        if (board.contains(neighbor) && !isDiscovered(neighbor)) {
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

function discover(square) {
    discovered[square.x][square.y] = true;
}

function isDiscovered(square) {
    return discovered[square.x]?.[square.y] ?? false;
}

function create2dBitmap(board) {
    return new Array(board.size)
        .fill()
        .map(() => new Array(board.size).fill(false));
}

function validateSquare(square) {
    if (!board.contains(square)) {
        throw new RangeError(
            `Start and end ranks and files must be within [0, ${board.size})`,
        );
    }
}

const pathfinder = {
    run,
};

export default pathfinder;
