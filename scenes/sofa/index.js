import animate from '../animate.js';
import download from '../download.js';
import hover from '../hover.js';

export const name = 'Sofa';

export default async function () {
  const { shapes } = await download('scenes/sofa/model.obj');
  return animate(640, 480, [shapes], hover(3, -.5));
}
