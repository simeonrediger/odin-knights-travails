const size = 8;

function contains(square) {
    return square.x >= 0 && square.x < size && square.y >= 0 && square.y < size;
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
