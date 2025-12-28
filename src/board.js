const size = 8;

function contains(...positions) {
    return positions.every(
        ([rank, file]) => rank >= 0 && rank < size && file >= 0 && file < size,
    );
}

function samePosition(...positions) {
    const [firstRank, firstFile] = positions[0];

    return positions.every(
        ([rank, file]) => rank === firstRank && file == firstFile,
    );
}

const board = {
    size,
    contains,
    samePosition,
};

export default board;
