export default function getShortestPath(board, knight, start, end) {
    validatePositions(board, start, end);
    knight.position = start;
    return pathfind(board, knight, start, end);
}

function validatePositions(board, ...positions) {
    if (!board.contains(...positions)) {
        throw new RangeError(
            `Start and end ranks and files must be within [0, ${board.size})`,
        );
    }
}

function pathfind(board, knight, start, end, visited = []) {
    visited.push(knight.position);
    const unexploredMoves = getUnexploredMoves(board, knight, visited);
}

function getUnexploredMoves(board, knight, visited) {
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
