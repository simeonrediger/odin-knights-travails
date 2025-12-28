let rank;
let file;

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
    rank,
    file,
    moveset,
};

export default knight;
