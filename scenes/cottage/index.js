import animate from '../animate.js';
import download from '../download.js';
import hover from '../hover.js';

export const name = 'Cottage';

export default async function () {
  const { shapes } = await download('scenes/cottage/model.obj');
  return animate(640, 480, [shapes], hover(30, -10));
}
