import board from './board.js';
import getShortestPath from './shortest-path.js';
import knight from './knight.js';

console.clear();

const start = [0, 0];
const end = [1, 2];
const path = getShortestPath(board, knight, start, end);

console.log('Path:', path);
console.log('Length:', path?.length);
