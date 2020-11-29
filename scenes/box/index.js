import animate from '../animate.js';
import hover from '../hover.js';

export const name = 'Box';

export default async function () {
  const shapes = [
    { type: 'face', points: [[-1, -1, -1], [1, -1, -1], [1, 1, -1], [-1, 1, -1]] }, // back face
    { type: 'face', points: [[-1, -1, 1], [1, -1, 1], [1, 1, 1], [-1, 1, 1]] }, // front face
    { type: 'edge', from: [-1, -1, -1], to: [-1, -1, 1] }, // top left
    { type: 'edge', from: [1, -1, -1], to: [1, -1, 1] }, // top right
    { type: 'edge', from: [1, 1, -1], to: [1, 1, 1] }, // bottom right
    { type: 'edge', from: [-1, 1, -1], to: [-1, 1, 1] }, // bottom left
  ];

  return animate(640, 480, shapes, hover());
}
