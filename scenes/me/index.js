import add3x1To3x1 from 'https://tomashubelbauer.github.io/esm-matrix/immutable/add3x1To3x1.js';
import rotate from '../rotate.js';
import animate from '../animate.js';

export const name = 'Me';

export default async function () {
  const shapes = [
    //{ type: 'face', points: [[-12, -1, 1], [12, -1, 1], [30, -1, -5], [-30, -1, -5]] },
  ];

  let cursor = 10;
  let unit = 1;

  // T
  shapes.push({ type: 'edge', from: [cursor, 1, 0], to: [cursor - unit, 1, 0] });
  cursor -= unit / 2;
  shapes.push({ type: 'edge', from: [cursor, 1, 0], to: [cursor, -1, 0] });
  cursor -= unit;

  // O
  shapes.push({ type: 'edge', from: [cursor, -.75, 0], to: [cursor, .75, 0] });
  shapes.push({ type: 'edge', from: [cursor, .75, 0], to: [cursor -= unit / 4, 1, 0] });
  shapes.push({ type: 'edge', from: [cursor, 1, 0], to: [cursor -= unit / 4, 1, 0] });
  shapes.push({ type: 'edge', from: [cursor, 1, 0], to: [cursor -= unit / 4, .75, 0] });
  shapes.push({ type: 'edge', from: [cursor, .75, 0], to: [cursor, -.75, 0] });
  shapes.push({ type: 'edge', from: [cursor, -.75, 0], to: [cursor += unit / 4, -1, 0] });
  shapes.push({ type: 'edge', from: [cursor, -1, 0], to: [cursor += unit / 4, -1, 0] });
  shapes.push({ type: 'edge', from: [cursor, -1, 0], to: [cursor += unit / 4, -.75, 0] });

  cursor -= unit * 1.25;

  // M
  shapes.push({ type: 'edge', from: [cursor, -1, 0], to: [cursor, 1, 0] });
  shapes.push({ type: 'edge', from: [cursor, 1, 0], to: [cursor -= unit / 2, 0, 0] });
  shapes.push({ type: 'edge', from: [cursor, 0, 0], to: [cursor -= unit / 2, 1, 0] });
  shapes.push({ type: 'edge', from: [cursor, 1, 0], to: [cursor, -1, 0] });
  cursor -= unit / 2;

  // A
  shapes.push({ type: 'edge', from: [cursor, -1, 0], to: [cursor, .75, 0] });
  shapes.push({ type: 'edge', from: [cursor, .75, 0], to: [cursor -= unit / 4, 1, 0] });
  shapes.push({ type: 'edge', from: [cursor, 1, 0], to: [cursor -= unit / 4, 1, 0] });
  shapes.push({ type: 'edge', from: [cursor, 1, 0], to: [cursor -= unit / 4, .75, 0] });
  shapes.push({ type: 'edge', from: [cursor, .75, 0], to: [cursor, -1, 0] });
  shapes.push({ type: 'edge', from: [cursor, 0, 0], to: [cursor + unit / 1.25, 0, 0] });
  cursor -= unit / 2;

  // S
  unit /= 1.5;
  shapes.push({ type: 'edge', from: [cursor - unit, 1, 0], to: [cursor - unit / 3, 1, 0] });
  shapes.push({ type: 'edge', from: [cursor - unit / 3, 1, 0], to: [cursor, .75, 0] });
  shapes.push({ type: 'edge', from: [cursor, .75, 0], to: [cursor, .25, 0] });
  shapes.push({ type: 'edge', from: [cursor, .25, 0], to: [cursor - unit, -.25, 0] });
  shapes.push({ type: 'edge', from: [cursor - unit, -.25, 0], to: [cursor - unit, -.75, 0] });
  shapes.push({ type: 'edge', from: [cursor - unit, -.75, 0], to: [cursor - unit / 1.5, -1, 0] });
  shapes.push({ type: 'edge', from: [cursor - unit / 1.5, -1, 0], to: [cursor, -1, 0] });
  unit *= 1.5;
  cursor -= unit * 2;

  // H
  shapes.push({ type: 'edge', from: [cursor, 1, 0], to: [cursor, -1, 0] });
  shapes.push({ type: 'edge', from: [cursor, 0, 0], to: [cursor -= unit, 0, 0] });
  shapes.push({ type: 'edge', from: [cursor, 1, 0], to: [cursor, -1, 0] });
  cursor -= unit / 2;

  // U
  shapes.push({ type: 'edge', from: [cursor, 1, 0], to: [cursor, -1, 0] });
  shapes.push({ type: 'edge', from: [cursor, -1, 0], to: [cursor -= unit / 1.25, -1, 0] });
  shapes.push({ type: 'edge', from: [cursor, -1, 0], to: [cursor, 1, 0] });
  cursor -= unit / 2;

  // B
  shapes.push({ type: 'edge', from: [cursor, 1, 0], to: [cursor, -1, 0] });
  shapes.push({ type: 'edge', from: [cursor, 1, 0], to: [cursor - unit / 1.5, 1, 0] });
  shapes.push({ type: 'edge', from: [cursor - unit / 1.5, 1, 0], to: [cursor - unit / 1.5, .25, 0] });
  shapes.push({ type: 'edge', from: [cursor - unit / 1.5, .25, 0], to: [cursor, 0, 0] });
  shapes.push({ type: 'edge', from: [cursor, 0, 0], to: [cursor - unit / 1.5, -.25, 0] });
  shapes.push({ type: 'edge', from: [cursor - unit / 1.5, -.25, 0], to: [cursor - unit / 1.5, -1, 0] });
  shapes.push({ type: 'edge', from: [cursor - unit / 1.5, -1, 0], to: [cursor, -1, 0] });
  cursor -= unit * 1.25;

  // E
  shapes.push({ type: 'edge', from: [cursor, 1, 0], to: [cursor, -1, 0] });
  shapes.push({ type: 'edge', from: [cursor, 1, 0], to: [cursor - unit / 2, 1, 0] });
  shapes.push({ type: 'edge', from: [cursor, 0, 0], to: [cursor - unit / 2, 0, 0] });
  shapes.push({ type: 'edge', from: [cursor, -1, 0], to: [cursor - unit / 2, -1, 0] });
  cursor -= unit;

  // L
  shapes.push({ type: 'edge', from: [cursor, 1, 0], to: [cursor, -1, 0] });
  shapes.push({ type: 'edge', from: [cursor, -1, 0], to: [cursor - unit / 2, -1, 0] });
  cursor -= unit / 1.15;

  // B
  shapes.push({ type: 'edge', from: [cursor, 1, 0], to: [cursor, -1, 0] });
  shapes.push({ type: 'edge', from: [cursor, 1, 0], to: [cursor - unit / 1.5, 1, 0] });
  shapes.push({ type: 'edge', from: [cursor - unit / 1.5, 1, 0], to: [cursor - unit / 1.5, .25, 0] });
  shapes.push({ type: 'edge', from: [cursor - unit / 1.5, .25, 0], to: [cursor, 0, 0] });
  shapes.push({ type: 'edge', from: [cursor, 0, 0], to: [cursor - unit / 1.5, -.25, 0] });
  shapes.push({ type: 'edge', from: [cursor - unit / 1.5, -.25, 0], to: [cursor - unit / 1.5, -1, 0] });
  shapes.push({ type: 'edge', from: [cursor - unit / 1.5, -1, 0], to: [cursor, -1, 0] });
  cursor -= unit * 1.25;

  // A
  shapes.push({ type: 'edge', from: [cursor, -1, 0], to: [cursor, .75, 0] });
  shapes.push({ type: 'edge', from: [cursor, .75, 0], to: [cursor -= unit / 4, 1, 0] });
  shapes.push({ type: 'edge', from: [cursor, 1, 0], to: [cursor -= unit / 4, 1, 0] });
  shapes.push({ type: 'edge', from: [cursor, 1, 0], to: [cursor -= unit / 4, .75, 0] });
  shapes.push({ type: 'edge', from: [cursor, .75, 0], to: [cursor, -1, 0] });
  shapes.push({ type: 'edge', from: [cursor, 0, 0], to: [cursor + unit / 1.25, 0, 0] });
  cursor -= unit / 2;

  // U
  shapes.push({ type: 'edge', from: [cursor, 1, 0], to: [cursor, -1, 0] });
  shapes.push({ type: 'edge', from: [cursor, -1, 0], to: [cursor -= unit / 1.25, -1, 0] });
  shapes.push({ type: 'edge', from: [cursor, -1, 0], to: [cursor, 1, 0] });
  cursor -= unit / 2;

  // E
  shapes.push({ type: 'edge', from: [cursor, 1, 0], to: [cursor, -1, 0] });
  shapes.push({ type: 'edge', from: [cursor, 1, 0], to: [cursor - unit / 2, 1, 0] });
  shapes.push({ type: 'edge', from: [cursor, 0, 0], to: [cursor - unit / 2, 0, 0] });
  shapes.push({ type: 'edge', from: [cursor, -1, 0], to: [cursor - unit / 2, -1, 0] });
  cursor -= unit;

  // R
  shapes.push({ type: 'edge', from: [cursor, 1, 0], to: [cursor, -1, 0] });
  shapes.push({ type: 'edge', from: [cursor, 1, 0], to: [cursor - unit / 1.5, 1, 0] });
  shapes.push({ type: 'edge', from: [cursor - unit / 1.5, 1, 0], to: [cursor - unit / 1.5, .25, 0] });
  shapes.push({ type: 'edge', from: [cursor - unit / 1.5, .25, 0], to: [cursor, 0, 0] });
  shapes.push({ type: 'edge', from: [cursor, 0, 0], to: [cursor - unit / 1.5, -.25, 0] });
  shapes.push({ type: 'edge', from: [cursor - unit / 1.5, -.25, 0], to: [cursor - unit / 1.5, -1, 0] });
  cursor -= unit * 1.25;

  for (let index = 0; index < 10; index++) {
    const originJitter = { sx: 2, sy: 1, sz: 2 };
    const scaleJitter = { sx: .1, sy: .1, sz: .5 };
    shapes.push(...box(jitter({ x: (-4 + index) * 2.5, y: 2, z: 0 }, originJitter), jitter({ x: .5, y: .5, z: .05 }, scaleJitter)));
    shapes.push(...box(jitter({ x: (-4 + index) * 2.5, y: -2, z: 0 }, originJitter), jitter({ x: .5, y: .5, z: .05 }, scaleJitter)));
  }

  const frames = [];
  for (let angle = 0; angle <= Math.PI * 2; angle += Math.PI / 20) {
    const center = [0, Math.sin(angle), -3.5];
    frames.push([
      point => add3x1To3x1(point, center),
      point => rotate(point, center, [Math.tan(angle) / 20, Math.tan(angle / 2) / 100, 0]),
    ]);
  }

  return animate(700, 200, shapes, frames, 2);
}

function jitter({ x, y, z }, { sz, sy, sx }) {
  return { x: x + (Math.random() - .5) * sx, y: y + (Math.random() - .5) * sy, z: z + (Math.random() - .5) * sz };
}

function box({ x, y, z }, { x: sx, y: sy, z: sz }) {
  return [
    { type: 'face', points: [[x - sx, y - sy, z - sz], [x + sx, y - sy, z - sz], [x + sx, y + sy, z - sz], [x - sx, y + sy, z - sz]] }, // back face
    { type: 'face', points: [[x - sx, y - sy, z + sz], [x + sx, y - sy, z + sz], [x + sx, y + sy, z + sz], [x - sx, y + sy, z + sz]] }, // front face
    { type: 'edge', from: [x - sx, y - sy, z - sz], to: [x - sx, y - sy, z + sz] }, // top left
    { type: 'edge', from: [x + sx, y - sy, z - sz], to: [x + sx, y - sy, z + sz] }, // top right
    { type: 'edge', from: [x + sx, y + sy, z - sz], to: [x + sx, y + sy, z + sz] }, // bottom right
    { type: 'edge', from: [x + -sx, y + sy, z - sz], to: [x - sx, y + sy, z + sz] }, // bottom left
  ];
}
