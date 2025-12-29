const size = 8;

function contains(...positions) {
    return positions.every(
        ([x, y]) => x >= 0 && x < size && y >= 0 && y < size,
    );
}

function sameSquare(x1, y1, x2, y2) {
    return x1 === x2 && y1 === y2;
}

const board = {
    size,
    contains,
    sameSquare,
};

export default board;
