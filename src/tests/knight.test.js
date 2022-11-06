import Board from "../board";
import Knight from "../knight";

it("returns the correct number of steps for the shortest path", () => {
  const board = Board();
  const knight = Knight(board);
  expect(knight.getShortestPath([0, 0], [1, 2])).toEqual([
    [0, 0],
    [1, 2],
  ]);
  expect(knight.getShortestPath([0, 0], [4, 5])).toEqual([
    [0, 0],
    [2, 1],
    [3, 3],
    [4, 5],
  ]);
  expect(knight.getShortestPath([7, 7], [1, 2])).toEqual([
    [7, 7],
    [6, 5],
    [5, 3],
    [4, 1],
    [2, 0],
    [1, 2],
  ]);
});

it("throws error when input coordinates are out of bound", () => {
  const board = Board();
  const knight = Knight(board);
  expect(() => knight.getShortestPath([-1, 0], [1, 2])).toThrow(
    "Coordinates must be between 0 and 7"
  );
  expect(() => knight.getShortestPath([0, 8], [0, 2])).toThrow(
    "Coordinates must be between 0 and 7"
  );
  expect(() => knight.getShortestPath([0, 0], [-1, 2])).toThrow(
    "Coordinates must be between 0 and 7"
  );
  expect(() => knight.getShortestPath([0, 0], [8, 2])).toThrow(
    "Coordinates must be between 0 and 7"
  );
});
