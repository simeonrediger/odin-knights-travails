import board from './board.js';
import knight from './knight.js';
import pathfinder from './pathfinder.js';

const start = { x: 0, y: 0 };
const end = { x: 7, y: 7 };

const { path, moves, squaresExplored } = pathfinder.run(
    board,
    knight,
    start,
    end,
);

console.log('Path:', path);
console.log('Moves:', moves);
console.log('Squares explored:', squaresExplored);
