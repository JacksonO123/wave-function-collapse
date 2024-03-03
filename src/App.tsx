import { numTiles } from "./data/tiles";
import "./App.css";
import Grid from "./components/Grid";
import Tile from "./components/Tile";

const App = () => {
  return (
    <div class="container">
      <section class="tile-wrapper">
        {Array(numTiles)
          .fill(null)
          .map((_, index) => (
            <Tile variant={index} size={60} border />
          ))}
      </section>
      <section class="collapse-grid">
        <Grid size={30} />
      </section>
    </div>
  );
};

export default App;
