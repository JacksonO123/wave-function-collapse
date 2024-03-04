import Tile from './Tile';
import './Grid.css';
import { createEffect, createSignal } from '@jacksonotto/pulse';
import { TileSize, getTileSize, getTiles, setTileSize } from '../data/tiles';
import RadioInput from './RadioInput';
import { Input } from '../types/worker';

type GridProps = {
  width: number;
  height: number;
};

const Grid = (props: GridProps) => {
  const [grid, setGrid] = createSignal<number[][]>([]);
  const [size, setSize] = createSignal<TileSize>(getTileSize());

  const workerCb = (message: MessageEvent<number[][]>) => {
    setGrid(message.data);
  };

  const createGenerateWorker = () => {
    const worker = new Worker(new URL('../worker.ts', import.meta.url), { type: 'module' });

    worker.addEventListener('message', workerCb);

    return worker;
  };

  let gridWorker = createGenerateWorker();

  const cleanGrid = (): number[][] =>
    Array(props.height)
      .fill([])
      .map((_, index) => {
        if (index === 0 || index === props.height - 1) {
          return Array(props.width).fill(0);
        }

        const arr = Array(props.width).fill(-1);

        arr[0] = 0;
        arr[arr.length - 1] = 0;

        return arr;
      });

  const generate = () => {
    const input: Input = {
      grid: cleanGrid(),
      tiles: getTiles()
    };

    gridWorker.postMessage(input);
  };

  createEffect(() => {
    setTileSize(size());
    gridWorker.terminate();
    gridWorker = createGenerateWorker();
    generate();
  });

  const buttonMap: Record<TileSize, string> = {
    '3x3': 'Three',
    '4x4': 'Four'
  };

  const updateSize = (newSize: TileSize) => {
    if (size() !== newSize) setSize(newSize);
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
            onClick={() => updateSize(key as TileSize)}
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
