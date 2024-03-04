import { getNumTiles } from './data/tiles';
import './App.css';
import Grid from './components/Grid';
import Tile from './components/Tile';

const App = () => {
  return (
    <div class="container">
      <section class="tile-wrapper">
        {Array(getNumTiles())
          .fill(null)
          .map((_, index) => (
            <Tile
              variant={index}
              size={30}
              border
            />
          ))}
      </section>
      <section class="collapse-grid">
        <Grid
          width={40}
          height={25}
        />
      </section>
    </div>
  );
};

export default App;
