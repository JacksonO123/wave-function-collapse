import { generateGrid } from '../util/tileUtils';
import Tile from './Tile';
import './Grid.css';
import { createEffect, createSignal } from '@jacksonotto/pulse';
import { TileSize, getTileSize, setTileSize } from '../data/tiles';
import RadioInput from './RadioInput';

type GridProps = {
  size: number;
};

const Grid = (props: GridProps) => {
  const cleanGrid = () =>
    Array(props.size)
      .fill([])
      .map((_, index) => {
        if (index === 0 || index === props.size - 1) {
          return Array(props.size).fill(0);
        }

        const arr = Array(props.size).fill(-1);

        arr[0] = 0;
        arr[arr.length - 1] = 0;

        return arr;
      });

  const [grid, setGrid] = createSignal<number[][]>([]);
  const [size, setSize] = createSignal<TileSize>(getTileSize());

  const generate = () => {
    setGrid(generateGrid(cleanGrid()));
  };

  createEffect(() => {
    setTileSize(size());
    generate();
  });

  const buttonMap: Record<TileSize, string> = {
    '3x3': 'Three',
    '4x4': 'Four'
  };

  return (
    <div class="grid-wrapper">
      <div class="controls">
        <button
          onClick={generate}
          class="generate"
        >
          Generate
        </button>
        {Object.entries(buttonMap).map(([key, value]) => (
          <RadioInput
            checked={size() === key}
            onClick={() => setSize(key as TileSize)}
          >
            {value}
          </RadioInput>
        ))}
      </div>
      <div class="grid">
        {grid().map((row) => (
          <div class="grid-row">
            {row.map((item) => (
              <Tile variant={item} />
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Grid;
