import "./Tile.css";
import { blankTile, numTiles, tiles } from "../data/tiles";

type TypeProps = {
  variant: number;
  size?: number;
  border?: boolean;
};

const Tile = (props: TypeProps) => {
  if (props.variant < -1 || props.variant >= numTiles)
    return (
      <div
        style={{
          width: "100%",
          height: "100%",
          "font-size": "10px",
          background: "red",
        }}
      >
        {props.variant}
      </div>
    );

  const tileMap = props.variant === -1 ? blankTile : tiles[props.variant];

  return (
    <div
      style={{
        // width: props.size === undefined ? "100%" : `${props.size}px`,
        height: props.size === undefined ? "100%" : `${props.size}px`,
        "aspect-ratio": 1,
        "min-width": props.size === undefined ? undefined : `${props.size}px`,
        "min-height": props.size === undefined ? undefined : `${props.size}px`,
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
