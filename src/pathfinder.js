import Queue from './queue.js';

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
    goal = end;
    positionsExplored = 0;
    const path = [start];
    const shortestPath = explore({ path });

    return {
        path: shortestPath,
        moves: shortestPath.length - 1,
        positionsExplored,
    };
}

function explore({ path, move }) {
    // knight.position = path[path.length - 1];

    if (move) {
        // knight.applyMove(move);
        path.push(knight.position);
    }

    discovered.add(knight.position);
    positionsExplored++;

    if (board.samePosition(knight.position, goal)) {
        return path;
    }

    const unexploredMoves = getUnexploredMoves();

    for (const unexploredMove of unexploredMoves) {
        const test = { path, move: unexploredMove };
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

        const alreadyVisited = discovered.has(newPosition);
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
