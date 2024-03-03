import { numTiles, tiles } from "../data/tiles";

const randomTile = () => Math.floor(Math.random() * numTiles);

const getPosPairs = (grid: number[][]) => {
  const posPairs: [number, number][] = [];

  for (let i = 0; i < grid.length; i++) {
    for (let j = 0; j < grid.length; j++) {
      if (grid[i][j] > -1) continue;

      if (i - 1 >= 0 && grid[i - 1][j] > -1) posPairs.push([i, j]);
      if (j - 1 >= 0 && grid[i][j - 1] > -1) posPairs.push([i, j]);
      if (i + 1 < grid.length && grid[i + 1][j] > -1) posPairs.push([i, j]);
      if (j + 1 < grid.length && grid[i][j + 1] > -1) posPairs.push([i, j]);
    }
  }

  return posPairs;
};

const filterPossibilities = <T extends "vertical" | "horizontal">(
  grid: number[][],
  possibilities: number[],
  row: number,
  col: number,
  border: T,
  position: T extends "vertical" ? "above" | "below" : "left" | "right",
) => {
  if (row >= 0 && row < grid.length && col >= 0 && col < grid.length) {
    const tileVariant = grid[row][col];
    const tileMap = tiles[tileVariant];

    if (tileMap) {
      return possibilities.filter((item) => {
        const tempMap = tiles[item];

        for (let i = 0; i < tileMap.length; i++) {
          let rowIndex = 0;
          let colIndex = 0;

          if (border === "vertical") {
            if (position === "above") rowIndex = tileMap.length - 1;
            colIndex = i;
          } else {
            if (position === "left") colIndex = tileMap.length - 1;
            rowIndex = i;
          }

          if (
            tileMap[rowIndex][colIndex] !==
            tempMap[
              border === "vertical" ? tileMap.length - rowIndex - 1 : rowIndex
            ][
              border === "horizontal" ? tileMap.length - colIndex - 1 : colIndex
            ]
          )
            return false;
        }

        return true;
      });
    }
  }

  return possibilities;
};

const getPossibilities = (grid: number[][], row: number, col: number) => {
  let possibilities = Array(numTiles)
    .fill(0)
    .map((_, index) => index);

  possibilities = filterPossibilities(
    grid,
    possibilities,
    row - 1,
    col,
    "vertical",
    "above",
  );
  possibilities = filterPossibilities(
    grid,
    possibilities,
    row + 1,
    col,
    "vertical",
    "below",
  );
  possibilities = filterPossibilities(
    grid,
    possibilities,
    row,
    col - 1,
    "horizontal",
    "left",
  );
  possibilities = filterPossibilities(
    grid,
    possibilities,
    row,
    col + 1,
    "horizontal",
    "right",
  );

  return possibilities;
};

type PosData = {
  row: number;
  col: number;
  possibilities: number[];
};

export const generateGrid = (grid: number[][]) => {
  const randX = Math.floor(Math.random() * grid.length);
  const randY = Math.floor(Math.random() * grid.length);

  grid[randX][randY] = randomTile();

  const totalTiles = grid.length * grid.length;

  for (let i = 0; i < totalTiles; i++) {
    const posPairs = getPosPairs(grid);
    let lowestPos: PosData | null = null;

    posPairs.forEach(([row, col]) => {
      const possibilities = getPossibilities(grid, row, col);

      const posData: PosData = {
        row,
        col,
        possibilities,
      };

      if (lowestPos === null) lowestPos = posData;
      else if (
        lowestPos.possibilities.length > posData.possibilities.length &&
        posData.possibilities.length > 0
      ) {
        lowestPos = posData;
      }
    });

    if (lowestPos === null) continue;

    const possibilities = (lowestPos as PosData).possibilities;
    const newTile =
      possibilities[Math.floor(Math.random() * possibilities.length)];

    grid[(lowestPos as PosData).row][(lowestPos as PosData).col] = newTile;
  }

  return grid;
};
