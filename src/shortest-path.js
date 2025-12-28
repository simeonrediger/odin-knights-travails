export default function getShortestPath(board, knight, start, end) {
    if (!board.contains(start, end)) {
        throw new RangeError(
            'Start and end ranks and files must be within [0, 8)',
        );
    }
}
