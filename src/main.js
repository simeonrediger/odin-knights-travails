import board from './board.js';
import knight from './knight.js';
import pathfinder from './pathfinder.js';

console.clear();

const start = [0, 0];
const end = [1, 2];
const path = pathfinder.run(board, knight, start, end);

console.log('Path:', path);
console.log('Moves:', path.length - 1);
