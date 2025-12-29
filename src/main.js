import board from './board.js';
import knight from './knight.js';
import pathfinder from './pathfinder.js';

console.clear();

const start = [0, 0];
const end = [7, 7];
const { path, moves, positionsExplored } = pathfinder.run(
    board,
    knight,
    start,
    end,
);

console.log('Path:', path);
console.log('Moves:', moves);
console.log('Positions explored:', positionsExplored);
