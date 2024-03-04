export const getPosPairs = (grid: number[][]) => {
  const posPairs: [number, number][] = [];

  for (let i = 0; i < grid.length; i++) {
    for (let j = 0; j < grid[i].length; j++) {
      if (grid[i][j] > -1) continue;

      if (i - 1 >= 0 && grid[i - 1][j] > -1) posPairs.push([i, j]);
      else if (j - 1 >= 0 && grid[i][j - 1] > -1) posPairs.push([i, j]);
      else if (i + 1 < grid.length && grid[i + 1][j] > -1) posPairs.push([i, j]);
      else if (j + 1 < grid.length && grid[i][j + 1] > -1) posPairs.push([i, j]);

      if (posPairs.length > 1) {
        const swapIndex = Math.floor(Math.random() * posPairs.length);

        const temp = posPairs[swapIndex];
        posPairs[swapIndex] = posPairs[posPairs.length - 1];
        posPairs[posPairs.length - 1] = temp;
      }
    }
  }

  return posPairs;
};

const filterPossibilities = <T extends 'vertical' | 'horizontal'>(
  grid: number[][],
  tiles: number[][][],
  possibilities: number[],
  row: number,
  col: number,
  border: T,
  position: T extends 'vertical' ? 'above' | 'below' : 'left' | 'right'
) => {
  if (row >= 0 && row < grid.length && col >= 0 && col < grid[0].length) {
    const tileVariant = grid[row][col];
    const tileMap = tiles[tileVariant];

    if (tileMap) {
      return possibilities.filter((item) => {
        const tempMap = tiles[item];

        for (let i = 0; i < tileMap.length; i++) {
          let rowIndex = 0;
          let colIndex = 0;

          if (border === 'vertical') {
            if (position === 'above') rowIndex = tileMap.length - 1;
            colIndex = i;
          } else {
            if (position === 'left') colIndex = tileMap.length - 1;
            rowIndex = i;
          }

          if (
            tileMap[rowIndex][colIndex] !==
            tempMap[border === 'vertical' ? tileMap.length - rowIndex - 1 : rowIndex][
              border === 'horizontal' ? tileMap.length - colIndex - 1 : colIndex
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

const getPossibilities = (grid: number[][], tiles: number[][][], row: number, col: number) => {
  let possibilities = Array(tiles.length)
    .fill(0)
    .map((_, index) => index);

  possibilities = filterPossibilities(grid, tiles, possibilities, row - 1, col, 'vertical', 'above');
  possibilities = filterPossibilities(grid, tiles, possibilities, row + 1, col, 'vertical', 'below');
  possibilities = filterPossibilities(grid, tiles, possibilities, row, col - 1, 'horizontal', 'left');
  possibilities = filterPossibilities(grid, tiles, possibilities, row, col + 1, 'horizontal', 'right');

  return possibilities;
};

type PosData = {
  row: number;
  col: number;
  possibilities: number[];
};

const getLowestCoordData = (
  grid: number[][],
  tiles: number[][][],
  coords: [number, number][]
): PosData | null => {
  let lowestPos: PosData | null = null;

  coords.forEach(([row, col]) => {
    const possibilities = getPossibilities(grid, tiles, row, col);

    const posData: PosData = {
      row,
      col,
      possibilities
    };

    if (lowestPos === null) {
      lowestPos = posData;
    } else if (
      lowestPos.possibilities.length > posData.possibilities.length &&
      posData.possibilities.length > 0
    ) {
      lowestPos = posData;
    }
  });

  return lowestPos;
};

export const generateGrid = (grid: number[][], tiles: number[][][]) => {
  const randRow = Math.floor(Math.random() * (grid.length - 2)) + 1;
  const randCol = Math.floor(Math.random() * (grid[0].length - 2)) + 1;

  grid[randRow][randCol] = Math.floor(Math.random() * tiles.length);

  const totalTiles = grid.length * grid[0].length;

  for (let i = 0; i < totalTiles; i++) {
    const posPairs = getPosPairs(grid);
    const lowest = getLowestCoordData(grid, tiles, posPairs);

    if (lowest === null) continue;

    const possibilities = lowest.possibilities;
    const newTile = possibilities[Math.floor(Math.random() * possibilities.length)];

    grid[lowest.row][lowest.col] = newTile === undefined ? -2 : newTile;
  }

  return grid;
};
