import animate from '../animate.js';
import pick from '../pick.js';
import hover from '../hover.js';

export const name = '…';

export default async function () {
  const { shapes } = await pick();
  return animate(640, 480, shapes, hover());
}
