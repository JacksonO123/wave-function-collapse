import { numTiles, tiles } from "../data/tiles";

export const randomTile = () => Math.floor(Math.random() * numTiles);

export const cloneGrid = (grid: number[][]) =>
  grid.map((row) => row.map((item) => item));

export const getPosPairs = (grid: number[][]) => {
  const posPairs: [number, number][] = [];

  for (let i = 0; i < grid.length; i++) {
    for (let j = 0; j < grid.length; j++) {
      if (grid[i][j] > -1) continue;

      if (i - 1 >= 0) {
        if (grid[i - 1][j] > -1) {
          posPairs.push([i, j]);
        }
      }

      if (i + 1 < grid.length) {
        if (grid[i + 1][j] > -1) {
          posPairs.push([i, j]);
        }
      }

      if (j - 1 >= 0) {
        if (grid[i][j - 1] > -1) {
          posPairs.push([i, j]);
        }
      }

      if (j + 1 < grid.length) {
        if (grid[i][j + 1] > -1) {
          posPairs.push([i, j]);
        }
      }
    }
  }

  return posPairs;
};

export const getPossibilities = (
  grid: number[][],
  row: number,
  col: number,
) => {
  let possibilities = Array(numTiles)
    .fill(0)
    .map((_, index) => index);

  if (row > 0) {
    const tileVariant = grid[row - 1][col];
    const tileMap = tiles[tileVariant];

    if (tileMap) {
      possibilities = possibilities.filter((item) => {
        const tempMap = tiles[item];
        return (
          (tileMap[2][1] === 0 && tempMap[0][1] === 0) ||
          (tileMap[2][1] === 1 && tempMap[0][1] === 1)
        );
      });
    }
  }

  if (col > 0) {
    const tileVariant = grid[row][col - 1];
    const tileMap = tiles[tileVariant];

    if (tileMap) {
      possibilities = possibilities.filter((item) => {
        const tempMap = tiles[item];
        return (
          (tileMap[1][2] === 0 && tempMap[1][0] === 0) ||
          (tileMap[1][2] === 1 && tempMap[1][0] === 1)
        );
      });
    }
  }

  if (row + 1 < grid.length) {
    const tileVariant = grid[row + 1][col];
    const tileMap = tiles[tileVariant];

    if (tileMap) {
      possibilities = possibilities.filter((item) => {
        const tempMap = tiles[item];
        return (
          (tileMap[0][1] === 0 && tempMap[2][1] === 0) ||
          (tileMap[0][1] === 1 && tempMap[2][1] === 1)
        );
      });
    }
  }

  if (col + 1 < grid.length) {
    const tileVariant = grid[row][col + 1];
    const tileMap = tiles[tileVariant];

    if (tileMap) {
      possibilities = possibilities.filter((item) => {
        const tempMap = tiles[item];
        return (
          (tileMap[1][0] === 0 && tempMap[1][2] === 0) ||
          (tileMap[1][0] === 1 && tempMap[1][2] === 1)
        );
      });
    }
  }

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
