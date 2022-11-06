import Square from "./square";
import Board from "./board";
import { includesArr } from "./utils";

interface Knight {
  getShortestPath: (originCoord: number[], targetCoord: number[]) => number[][];
  knightMoves: (originCoord: number[], targetCoord: number[]) => void;
}

const Knight = (board: Board): Knight => {
  const createParentRelations = (
    originCoord: number[],
    targetCoord: number[],
    queue: number[][] = []
  ): number[][] => {
    const originSquare: Square = board.findSquareByCoord(originCoord);

    if (includesArr(originSquare.leaves, targetCoord)) {
      queue.length = 0;

      const targetSquare: Square = board.findSquareByCoord(targetCoord);
      targetSquare.parent = originSquare;

      return null;
    }

    originSquare.leaves.forEach((coord) => {
      queue.push(coord);
      const square = board.findSquareByCoord(coord);
      if (square.parent === null) square.parent = originSquare;
    });

    if (queue.length > 0) {
      createParentRelations(queue.shift(), targetCoord, queue);
    }
  };

  const traverseParentRelations = (
    originCoord: number[],
    targetCoord: number[],
    path: number[][] = []
  ): number[][] => {
    const originSquare: Square = board.findSquareByCoord(originCoord);
    const targetSquare: Square = board.findSquareByCoord(targetCoord);

    path.unshift(targetCoord);

    if (targetSquare.parent === originSquare) {
      return path;
    }

    return traverseParentRelations(
      originCoord,
      targetSquare.parent.coord,
      path
    );
  };

  const clearParentRelations = (): void => {
    board.squares.forEach((square) => (square.parent = null));
  };

  const getShortestPath = (originCoord: number[], targetCoord: number[]) => {
    if (
      originCoord.some((n) => n < 0 || n > 7) ||
      targetCoord.some((n) => n < 0 || n > 7)
    ) {
      throw RangeError("Coordinates must be between 0 and 7.");
    }

    createParentRelations(originCoord, targetCoord);

    const path: number[][] = traverseParentRelations(originCoord, targetCoord);

    clearParentRelations();

    return [originCoord, ...path];
  };

  const knightMoves = (originCoord: number[], targetCoord: number[]): void => {
    const path = getShortestPath(originCoord, targetCoord);
    console.log(
      `=> You made it in ${path.length - 1} moves!  Here's your path:`
    );
    path.forEach((step) => console.log(step));
  };

  return { getShortestPath, knightMoves };
};

export default Knight;
