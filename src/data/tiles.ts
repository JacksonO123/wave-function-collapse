import { createSignal } from '@jacksonotto/pulse';
import * as three from './tiles3x3';
import * as four from './tiles4x4';

export type TileSize = '3x3' | '4x4';

type SizeData = {
  blankTile: number[][];
  tiles: number[][][];
  numTiles: number;
};

const [getTileSize, setTileSize] = createSignal<TileSize>('4x4');

export { getTileSize, setTileSize };

const dataMap: Record<TileSize, SizeData> = {
  '3x3': three,
  '4x4': four
};

export const getTiles = () => {
  return dataMap[getTileSize()].tiles || [];
};

export const getBlankTile = () => {
  return dataMap[getTileSize()].blankTile || [];
};

export const getNumTiles = () => {
  return dataMap[getTileSize()].numTiles || 0;
};
