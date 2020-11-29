import subtract3x1From3x1 from 'https://tomashubelbauer.github.io/esm-matrix/immutable/subtract3x1From3x1.js';
import add3x1To3x1 from 'https://tomashubelbauer.github.io/esm-matrix/immutable/add3x1To3x1.js';
import multiply3x3By3x3 from 'https://tomashubelbauer.github.io/esm-matrix/immutable/multiply3x3By3x3.js';
import multiply3x3By3x1To3x1 from 'https://tomashubelbauer.github.io/esm-matrix/immutable/multiply3x3By3x1To3x1.js';

export default function rotate(point, origin, [x, y, z]) {
  const rotationAroundX = [
    1, 0, 0,
    0, Math.cos(x), Math.sin(x),
    0, -Math.sin(x), Math.cos(x),
  ];

  const rotationAroundY = [
    Math.cos(y), 0, -Math.sin(y),
    0, 1, 0,
    Math.sin(y), 0, Math.cos(y),
  ];

  const rotationAroundZ = [
    Math.cos(z), Math.sin(z), 0,
    -Math.sin(z), Math.cos(z), 0,
    0, 0, 1,
  ];

  const pointToOrigin = subtract3x1From3x1(point, origin);
  const originTransformedPoint = multiply3x3By3x1To3x1(multiply3x3By3x3(multiply3x3By3x3(rotationAroundX, rotationAroundY), rotationAroundZ), pointToOrigin);
  return add3x1To3x1(originTransformedPoint, origin);
}
