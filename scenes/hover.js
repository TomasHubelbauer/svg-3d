import add3x1To3x1 from 'https://tomashubelbauer.github.io/esm-matrix/immutable/add3x1To3x1.js';
import rotate from './rotate.js';

export default function hover(distance = 5, ground = 0) {
  const frames = [];
  for (let angle = 0; angle <= Math.PI * 2; angle += Math.PI / 5) {
    const center = [0, ground + Math.sin(angle), -distance];
    frames.push([
      point => add3x1To3x1(point, center),
      point => rotate(point, center, [0, angle, 0]),
    ]);
  }

  return frames;
}
