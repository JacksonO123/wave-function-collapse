import { Input } from './types/worker';
import { generateGrid } from './util/tileUtils';

self.addEventListener('message', (message: MessageEvent<Input>) => {
  const resGrid = generateGrid(message.data.grid, message.data.tiles);

  self.postMessage(resGrid);
});
