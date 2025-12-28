const size = 8;

function contains(...positions) {
    return positions.every(
        ([rank, file]) => rank >= 0 && rank < size && file >= 0 && file < size,
    );
}

const board = {
    contains,
};

export default board;
