import { cloneGrid, generateGrid } from "../util/tileUtils";
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
      .map(() => Array(props.size).fill(-1));

  const [grid, setGrid] = createSignal<number[][]>(cleanGrid());

  const generate = () => {
    setGrid(cloneGrid(generateGrid(cleanGrid())));
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
