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
    const uniquePossibleMoves = getUniquePossibleMoves(board, knight, visited);
}

function getUniquePossibleMoves(board, knight, visited) {
    return knight.moveset.filter(move => {
        const newPosition = [
            knight.position[0] + move[0],
            knight.position[1] + move[1],
        ];

        const possible =
            newPosition[0] >= 0 &&
            newPosition[0] < board.size &&
            newPosition[1] >= 0 &&
            newPosition[1] < board.size;

        if (!possible) {
            return false;
        }

        const alreadyVisited = visited.some(
            visitedPosition =>
                newPosition[0] === visitedPosition[0] &&
                newPosition[1] === visitedPosition[1],
        );

        return !alreadyVisited;
    });
}
