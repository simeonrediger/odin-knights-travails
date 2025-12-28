export default function getShortestPath(
    board,
    knight,
    [startRank, startFile],
    [endRank, endFile],
) {
    if (!board.contains([startRank, startFile], [endRank, endFile])) {
        throw new RangeError(
            'Start and end ranks and files must be within [0, 8)',
        );
    }
}
