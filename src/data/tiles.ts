import * as three from './tiles3x3';
import * as four from './tiles4x4';

export type TileSize = '3x3' | '4x4';

type SizeData = {
  blankTile: number[][];
  tiles: number[][][];
  numTiles: number;
};

let tileSize: TileSize = '4x4';

const dataMap: Record<TileSize, SizeData> = {
  '3x3': three,
  '4x4': four
};

export const getTileSize = () => {
  return tileSize;
};

export const setTileSize = (size: '3x3' | '4x4') => {
  tileSize = size;
};

export const getTiles = () => {
  return dataMap[tileSize].tiles || [];
};

export const getBlankTile = () => {
  return dataMap[tileSize].blankTile || [];
};

export const getNumTiles = () => {
  return dataMap[tileSize].numTiles || 0;
};
