import add3x1To3x1 from 'https://tomashubelbauer.github.io/esm-matrix/immutable/add3x1To3x1.js';
import rotate from '../rotate.js';
import animate from '../animate.js';
import obj from '../obj/index.js';

export const name = 'Me';

export default async function () {
  const shapes = [];
  let textShapes = [];

  let cursor = 10;
  let unit = 1;

  // T
  textShapes = [];
  textShapes.push({ type: 'edge', from: [cursor, 1, 0], to: [cursor - unit, 1, 0] });
  cursor -= unit / 2;
  textShapes.push({ type: 'edge', from: [cursor, 1, 0], to: [cursor, -1, 0] });
  cursor -= unit;
  shapes.push(textShapes);

  // O
  textShapes = [];
  textShapes.push({ type: 'edge', from: [cursor, -.75, 0], to: [cursor, .75, 0] });
  textShapes.push({ type: 'edge', from: [cursor, .75, 0], to: [cursor -= unit / 4, 1, 0] });
  textShapes.push({ type: 'edge', from: [cursor, 1, 0], to: [cursor -= unit / 4, 1, 0] });
  textShapes.push({ type: 'edge', from: [cursor, 1, 0], to: [cursor -= unit / 4, .75, 0] });
  textShapes.push({ type: 'edge', from: [cursor, .75, 0], to: [cursor, -.75, 0] });
  textShapes.push({ type: 'edge', from: [cursor, -.75, 0], to: [cursor += unit / 4, -1, 0] });
  textShapes.push({ type: 'edge', from: [cursor, -1, 0], to: [cursor += unit / 4, -1, 0] });
  textShapes.push({ type: 'edge', from: [cursor, -1, 0], to: [cursor += unit / 4, -.75, 0] });
  cursor -= unit * 1.25;
  shapes.push(textShapes);

  // M
  textShapes = [];
  textShapes.push({ type: 'edge', from: [cursor, -1, 0], to: [cursor, 1, 0] });
  textShapes.push({ type: 'edge', from: [cursor, 1, 0], to: [cursor -= unit / 2, 0, 0] });
  textShapes.push({ type: 'edge', from: [cursor, 0, 0], to: [cursor -= unit / 2, 1, 0] });
  textShapes.push({ type: 'edge', from: [cursor, 1, 0], to: [cursor, -1, 0] });
  cursor -= unit / 2;
  shapes.push(textShapes);

  // A
  textShapes = [];
  textShapes.push({ type: 'edge', from: [cursor, -1, 0], to: [cursor, .75, 0] });
  textShapes.push({ type: 'edge', from: [cursor, .75, 0], to: [cursor -= unit / 4, 1, 0] });
  textShapes.push({ type: 'edge', from: [cursor, 1, 0], to: [cursor -= unit / 4, 1, 0] });
  textShapes.push({ type: 'edge', from: [cursor, 1, 0], to: [cursor -= unit / 4, .75, 0] });
  textShapes.push({ type: 'edge', from: [cursor, .75, 0], to: [cursor, -1, 0] });
  textShapes.push({ type: 'edge', from: [cursor, 0, 0], to: [cursor + unit / 1.25, 0, 0] });
  cursor -= unit / 2;
  shapes.push(textShapes);

  // S
  textShapes = [];
  unit /= 1.5;
  textShapes.push({ type: 'edge', from: [cursor - unit, 1, 0], to: [cursor - unit / 3, 1, 0] });
  textShapes.push({ type: 'edge', from: [cursor - unit / 3, 1, 0], to: [cursor, .75, 0] });
  textShapes.push({ type: 'edge', from: [cursor, .75, 0], to: [cursor, .25, 0] });
  textShapes.push({ type: 'edge', from: [cursor, .25, 0], to: [cursor - unit, -.25, 0] });
  textShapes.push({ type: 'edge', from: [cursor - unit, -.25, 0], to: [cursor - unit, -.75, 0] });
  textShapes.push({ type: 'edge', from: [cursor - unit, -.75, 0], to: [cursor - unit / 1.5, -1, 0] });
  textShapes.push({ type: 'edge', from: [cursor - unit / 1.5, -1, 0], to: [cursor, -1, 0] });
  unit *= 1.5;
  cursor -= unit * 2;
  shapes.push(textShapes);

  // H
  textShapes = [];
  textShapes.push({ type: 'edge', from: [cursor, 1, 0], to: [cursor, -1, 0] });
  textShapes.push({ type: 'edge', from: [cursor, 0, 0], to: [cursor -= unit, 0, 0] });
  textShapes.push({ type: 'edge', from: [cursor, 1, 0], to: [cursor, -1, 0] });
  cursor -= unit / 2;
  shapes.push(textShapes);

  // U
  textShapes = [];
  textShapes.push({ type: 'edge', from: [cursor, 1, 0], to: [cursor, -1, 0] });
  textShapes.push({ type: 'edge', from: [cursor, -1, 0], to: [cursor -= unit / 1.25, -1, 0] });
  textShapes.push({ type: 'edge', from: [cursor, -1, 0], to: [cursor, 1, 0] });
  cursor -= unit / 2;
  shapes.push(textShapes);

  // B
  textShapes = [];
  textShapes.push({ type: 'edge', from: [cursor, 1, 0], to: [cursor, -1, 0] });
  textShapes.push({ type: 'edge', from: [cursor, 1, 0], to: [cursor - unit / 1.5, 1, 0] });
  textShapes.push({ type: 'edge', from: [cursor - unit / 1.5, 1, 0], to: [cursor - unit / 1.5, .25, 0] });
  textShapes.push({ type: 'edge', from: [cursor - unit / 1.5, .25, 0], to: [cursor, 0, 0] });
  textShapes.push({ type: 'edge', from: [cursor, 0, 0], to: [cursor - unit / 1.5, -.25, 0] });
  textShapes.push({ type: 'edge', from: [cursor - unit / 1.5, -.25, 0], to: [cursor - unit / 1.5, -1, 0] });
  textShapes.push({ type: 'edge', from: [cursor - unit / 1.5, -1, 0], to: [cursor, -1, 0] });
  cursor -= unit * 1.25;
  shapes.push(textShapes);

  // E
  textShapes = [];
  textShapes.push({ type: 'edge', from: [cursor, 1, 0], to: [cursor, -1, 0] });
  textShapes.push({ type: 'edge', from: [cursor, 1, 0], to: [cursor - unit / 2, 1, 0] });
  textShapes.push({ type: 'edge', from: [cursor, 0, 0], to: [cursor - unit / 2, 0, 0] });
  textShapes.push({ type: 'edge', from: [cursor, -1, 0], to: [cursor - unit / 2, -1, 0] });
  cursor -= unit;
  shapes.push(textShapes);

  // L
  textShapes = [];
  textShapes.push({ type: 'edge', from: [cursor, 1, 0], to: [cursor, -1, 0] });
  textShapes.push({ type: 'edge', from: [cursor, -1, 0], to: [cursor - unit / 2, -1, 0] });
  cursor -= unit / 1.15;
  shapes.push(textShapes);

  // B
  textShapes = [];
  textShapes.push({ type: 'edge', from: [cursor, 1, 0], to: [cursor, -1, 0] });
  textShapes.push({ type: 'edge', from: [cursor, 1, 0], to: [cursor - unit / 1.5, 1, 0] });
  textShapes.push({ type: 'edge', from: [cursor - unit / 1.5, 1, 0], to: [cursor - unit / 1.5, .25, 0] });
  textShapes.push({ type: 'edge', from: [cursor - unit / 1.5, .25, 0], to: [cursor, 0, 0] });
  textShapes.push({ type: 'edge', from: [cursor, 0, 0], to: [cursor - unit / 1.5, -.25, 0] });
  textShapes.push({ type: 'edge', from: [cursor - unit / 1.5, -.25, 0], to: [cursor - unit / 1.5, -1, 0] });
  textShapes.push({ type: 'edge', from: [cursor - unit / 1.5, -1, 0], to: [cursor, -1, 0] });
  cursor -= unit * 1.25;
  shapes.push(textShapes);

  // A
  textShapes = [];
  textShapes.push({ type: 'edge', from: [cursor, -1, 0], to: [cursor, .75, 0] });
  textShapes.push({ type: 'edge', from: [cursor, .75, 0], to: [cursor -= unit / 4, 1, 0] });
  textShapes.push({ type: 'edge', from: [cursor, 1, 0], to: [cursor -= unit / 4, 1, 0] });
  textShapes.push({ type: 'edge', from: [cursor, 1, 0], to: [cursor -= unit / 4, .75, 0] });
  textShapes.push({ type: 'edge', from: [cursor, .75, 0], to: [cursor, -1, 0] });
  textShapes.push({ type: 'edge', from: [cursor, 0, 0], to: [cursor + unit / 1.25, 0, 0] });
  cursor -= unit / 2;
  shapes.push(textShapes);

  // U
  textShapes = [];
  textShapes.push({ type: 'edge', from: [cursor, 1, 0], to: [cursor, -1, 0] });
  textShapes.push({ type: 'edge', from: [cursor, -1, 0], to: [cursor -= unit / 1.25, -1, 0] });
  textShapes.push({ type: 'edge', from: [cursor, -1, 0], to: [cursor, 1, 0] });
  cursor -= unit / 2;
  shapes.push(textShapes);

  // E
  textShapes = [];
  textShapes.push({ type: 'edge', from: [cursor, 1, 0], to: [cursor, -1, 0] });
  textShapes.push({ type: 'edge', from: [cursor, 1, 0], to: [cursor - unit / 2, 1, 0] });
  textShapes.push({ type: 'edge', from: [cursor, 0, 0], to: [cursor - unit / 2, 0, 0] });
  textShapes.push({ type: 'edge', from: [cursor, -1, 0], to: [cursor - unit / 2, -1, 0] });
  cursor -= unit;
  shapes.push(textShapes);

  // R
  textShapes = [];
  textShapes.push({ type: 'edge', from: [cursor, 1, 0], to: [cursor, -1, 0] });
  textShapes.push({ type: 'edge', from: [cursor, 1, 0], to: [cursor - unit / 1.5, 1, 0] });
  textShapes.push({ type: 'edge', from: [cursor - unit / 1.5, 1, 0], to: [cursor - unit / 1.5, .25, 0] });
  textShapes.push({ type: 'edge', from: [cursor - unit / 1.5, .25, 0], to: [cursor, 0, 0] });
  textShapes.push({ type: 'edge', from: [cursor, 0, 0], to: [cursor - unit / 1.5, -.25, 0] });
  textShapes.push({ type: 'edge', from: [cursor - unit / 1.5, -.25, 0], to: [cursor - unit / 1.5, -1, 0] });
  cursor -= unit * 1.25;
  shapes.push(textShapes);

  for (let index = 0; index < 10; index++) {
    const originJitter = [2, 1, 2];
    const topOrigin = jitter([(-4 + index) * 2.5, 2, 0], originJitter);
    const bottomOrigin = jitter([(-4 + index) * 2.5, -2, 0], originJitter);
    const scaleJitter = [.1, .1, .075];
    const topShapes = box(topOrigin, jitter([.25, .25, .05], scaleJitter));
    const bottomShapes = box(bottomOrigin, jitter([.25, .25, .05], scaleJitter));
    for (const cube of [{ shapes: topShapes, origin: topOrigin }, { shapes: bottomShapes, origin: bottomOrigin }]) {
      const rotation = [Math.random() * Math.PI, Math.random() * Math.PI, Math.random() * Math.PI];
      for (const shape of cube.shapes) {
        switch (shape.type) {
          case 'edge': {
            shape.from = rotate(shape.from, cube.origin, rotation);
            shape.to = rotate(shape.to, cube.origin, rotation);
            break;
          }
          case 'face': {
            shape.points = shape.points.map(point => rotate(point, cube.origin, rotation));
            break;
          }
        }
      }
    }

    shapes.push(topShapes);
    shapes.push(bottomShapes);
  }

  const frames = [];
  for (let angle = 0; angle <= Math.PI * 2; angle += Math.PI / 20) {
    frames.push([
      (point, objectIndex) => add3x1To3x1(point, [Math.tan(angle + objectIndex) / shapes.length / 2, Math.sin(angle + objectIndex) / shapes.length, -3.5 + Math.cos(objectIndex) / 10]),
      (point, objectIndex) => rotate(point, [0, 0, 0], [Math.tan(angle) / 20, Math.tan(angle / 2) / 100, objectIndex / shapes.length / 10]),
    ]);
  }

  return animate(900, 200, shapes, frames, 2, 1, false, 1);
}

function jitter([x, y, z], [sz, sy, sx]) {
  return [x + (Math.random() - .5) * sx, y + (Math.random() - .5) * sy, z + (Math.random() - .5) * sz];
}

function box([x, y, z], [sx, sy, sz]) {
  return [
    { type: 'face', points: [[x - sx, y - sy, z - sz], [x + sx, y - sy, z - sz], [x + sx, y + sy, z - sz], [x - sx, y + sy, z - sz]] }, // back face
    { type: 'face', points: [[x - sx, y - sy, z + sz], [x + sx, y - sy, z + sz], [x + sx, y + sy, z + sz], [x - sx, y + sy, z + sz]] }, // front face
    { type: 'edge', from: [x - sx, y - sy, z - sz], to: [x - sx, y - sy, z + sz] }, // top left
    { type: 'edge', from: [x + sx, y - sy, z - sz], to: [x + sx, y - sy, z + sz] }, // top right
    { type: 'edge', from: [x + sx, y + sy, z - sz], to: [x + sx, y + sy, z + sz] }, // bottom right
    { type: 'edge', from: [x + -sx, y + sy, z - sz], to: [x - sx, y + sy, z + sz] }, // bottom left
  ];
}
