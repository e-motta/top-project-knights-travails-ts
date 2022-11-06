import Board from "./board";
import Knight from "./knight";

// Example
const board = Board();
const knight = Knight(board);
knight.knightMoves([0, 0], [5, 7]);
