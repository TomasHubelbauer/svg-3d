import animate from '../animate.js';
import hover from '../hover.js';

export const name = 'Prism';

export default async function () {
  const shapes = [
    { type: 'face', points: [[-1, 1, -1], [1, 1, -1], [1, 1, 1], [-1, 1, 1]] }, // base
    { type: 'edge', from: [-1, 1, -1], to: [0, -1, 0] },
    { type: 'edge', from: [1, 1, -1], to: [0, -1, 0] },
    { type: 'edge', from: [1, 1, 1], to: [0, -1, 0] },
    { type: 'edge', from: [-1, 1, 1], to: [0, -1, 0] },
  ];

  return animate(640, 480, shapes, hover());
}
