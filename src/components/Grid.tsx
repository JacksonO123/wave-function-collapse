import { generateGrid } from "../util/tileUtils";
import Tile from "./Tile";
import "./Grid.css";
import { createSignal } from "@jacksonotto/pulse";

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

  const generate = () => {
    setGrid(generateGrid(cleanGrid()));
  };

  generate();

  return (
    <div class="grid-wrapper">
      <button onClick={generate}>Generate</button>
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
