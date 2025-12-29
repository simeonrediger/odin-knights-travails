const size = 8;

function contains(x, y) {
    return x >= 0 && x < size && y >= 0 && y < size;
}

function sameSquare(square1, square2) {
    return square1.x === square2.y && square1.x === square2.y;
}

const board = {
    size,
    contains,
    sameSquare,
};

export default board;
