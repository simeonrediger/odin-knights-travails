const position = [undefined, undefined];

const moveset = Object.freeze([
    [1, 2],
    [2, 1],
    [2, -1],
    [1, -2],
    [-1, -2],
    [-2, -1],
    [-2, 1],
    [-1, 2],
]);

function computePosition(move) {
    return [knight.position[0] + move[0], knight.position[1] + move[1]];
}

const knight = {
    moveset,
    computePosition,

    get position() {
        return position;
    },

    set position(newPosition) {
        [position[0], position[1]] = newPosition;
    },
};

export default knight;
