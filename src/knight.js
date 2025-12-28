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

const knight = {
    moveset,

    get position() {
        return position;
    },

    set position(newPosition) {
        [position[0], position[1]] = newPosition;
    },
};

export default knight;
