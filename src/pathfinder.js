import Queue from './queue.js';

let goal;
let visited = [];
let testPaths = new Queue();

function getShortestPath(board, start, end) {
    validatePositions(board, start, end);
    goal = end;
    const path = [start];
    return test(board, path);
}

function validatePositions(board, ...positions) {
    if (!board.contains(...positions)) {
        throw new RangeError(
            `Start and end ranks and files must be within [0, ${board.size})`,
        );
    }
}

function test(board, knight, end) {}

const pathfinder = {
    getShortestPath,
};

export default pathfinder;
