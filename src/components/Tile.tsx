import "./Tile.css";
import { blankTile, tiles } from "../data/tiles";

type TypeProps = {
  variant: number;
  size?: number;
  border?: boolean;
};

const Tile = (props: TypeProps) => {
  if (props.variant < -1 || props.variant >= tiles.length)
    return <div>Inalid tile: {props.variant}</div>;

  const tileMap = props.variant === -1 ? blankTile : tiles[props.variant];

  return (
    <div
      class="tile"
      style={{
        width: props.size === undefined ? "100%" : `${props.size}px`,
        height: props.size === undefined ? "100%" : `${props.size}px`,
        border: props.border ? "1px solid black" : "none",
      }}
    >
      {tileMap.map((rowMap) => (
        <div class="row">
          {rowMap.map((num) => (
            <div class={`box ${num === 1 ? "active" : "blank"}`} />
          ))}
        </div>
      ))}
    </div>
  );
};

export default Tile;
