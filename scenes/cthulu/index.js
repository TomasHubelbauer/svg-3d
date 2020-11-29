import add3x1To3x1 from 'https://tomashubelbauer.github.io/esm-matrix/immutable/add3x1To3x1.js';
import rotate from '../rotate.js';
import animate from '../animate.js';

export const name = 'Cthulu';

export default async function () {
  const shapes = [
    text(0, -.5, .2, .05, 1, ...'ALL'),
    text(0, 0, .2, .05, 1, ...'HAIL'),
    text(0, .5, .2, .05, 1, ...'CTHULHU'),
  ];

  for (let index = 0; index < 10; index++) {
    shapes.push(text(Math.random() * 2 - 1, Math.random() * 2 - 1, .1, 0, Math.random(), '♥'));
  }

  const frames = [];
  for (let angle = 0; angle <= Math.PI * 2; angle += Math.PI / 20) {
    frames.push([
      (point, objectIndex) => add3x1To3x1(point, [Math.sin(angle) * (objectIndex / shapes.length), Math.cos(angle) * (objectIndex / shapes.length), -3 + Math.cos(objectIndex / shapes.length) * Math.sin(angle)]),
      (point, objectIndex) => rotate(point, [0, 0, 0], [Math.PI, Math.PI, Math.sin(angle + objectIndex)]),
    ]);
  }

  return animate(500, 500, shapes, frames, 5, 2);
}

function random(seed) {
  let t = seed += 0x6D2B79F5;
  t = Math.imul(t ^ t >>> 15, t | 1);
  t ^= t + Math.imul(t ^ t >>> 7, t | 61);
  return ((t ^ t >>> 14) >>> 0) / 4294967296;
}

function text(x, y, scale, space, distance, ...text) {
  let size = 0;
  const shapes = [];
  for (const character of text) {
    const ratio = ratios[character];
    if (ratio === undefined) {
      throw new Error(`Missing ratio for character '${character}'.`);
    }

    const scaleX = scale * ratio;
    const scaleY = scale;
    size += scaleX;

    const lines = [];

    // Resolve multilines into individual lines
    // TODO: Add native support to multilines and remove this
    for (const points of symbols[character].map(points => [...points])) {
      lines.push([points.shift(), points.shift(), points.shift(), points.shift()]);
      while (points.length > 0) {
        const line = lines[lines.length - 1];
        lines.push([line[2], line[3], points.shift(), points.shift()]);
      }
    }

    for (const line of lines) {
      shapes.push({ type: 'edge', from: [size + line[0] * scaleX, line[1] * scaleY, distance], to: [size + line[2] * scaleX, line[3] * scaleY, distance] });
    }

    size += scaleX + space;
  }

  size -= space;
  for (const shape of shapes) {
    shape.from[0] -= size / 2;
    shape.from[0] += x;
    shape.from[1] += y;
    shape.to[0] -= size / 2;
    shape.to[0] += x;
    shape.to[1] += y;
  }

  return shapes;
}

const ratios = {
  A: .5,
  C: .4,
  H: .5,
  I: 0,
  L: .4,
  T: .4,
  U: .5,
  '♥': .75,
};

const symbols = {
  A: [
    [-1, 1, 0, -1],
    [0, -1, 1, 1],
    [-.5, 0, .5, 0]
  ],
  C: [
    mirrorVertical(1, -.75, .75, -.9, .25, -1, 0, -1, -.25, -1, -.5, -.95, -.75, -.85, -.9, -.7, -1, -.5, -1, 0)
  ],
  H: [
    [-1, -1, -1, 1],
    [1, -1, 1, 1],
    [-1, 0, 1, 0],
  ],
  I: [
    [0, -1, 0, 1],
  ],
  L: [
    [-1, -1, -1, 1, 1, 1],
  ],
  T: [
    [-1, -1, 1, -1],
    [0, 1, 0, -1],
  ],
  U: [
    mirrorHorizontal(-1, -1, -1, 0, -.9, .4, -.8, .6, -.7, .75, -.4, .95, -.3, .95, -.2, 1),
  ],
  '♥': [
    [...heart()]
  ]
};

function mirrorVertical(...points) {
  // Make bottom half using top half reversed pair-wise with Y sign-flipped
  return [...points, ...points.map((_, index, array) => index % 2 === 0 ? -array[index + 1] : array[index - 1]).reverse()];
}

function mirrorHorizontal(...points) {
  // Make right half using left half reversed pair-wise with X sign-flipped
  return [...points, ...points.map((_, index, array) => index % 2 === 0 ? array[index + 1] : -array[index - 1]).reverse()];
}

function* heart() {
  const r = .07;
  for (let angle = 0; angle <= 360; angle += 10) {
    let tr = angle * Math.PI / 180;
    yield 16 * r * Math.sin(tr) * Math.sin(tr) * Math.sin(tr);
    yield -(13 * r * Math.cos(tr) - 5 * r * Math.cos(2 * tr) - 2 * r * Math.cos(3 * tr) - r * Math.cos(4 * tr));
  }
}
