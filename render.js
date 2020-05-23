import subtract3x1From3x1 from 'https://tomashubelbauer.github.io/esm-matrix/immutable/subtract3x1From3x1.js';
import add3x1To3x1 from 'https://tomashubelbauer.github.io/esm-matrix/immutable/add3x1To3x1.js';
import multiply3x3By3x3 from 'https://tomashubelbauer.github.io/esm-matrix/immutable/multiply3x3By3x3.js';
import multiply3x3By3x1To3x1 from 'https://tomashubelbauer.github.io/esm-matrix/immutable/multiply3x3By3x1To3x1.js';
import width from './width.js';
import height from './height.js';

function rotate(point, origin, [x, y, z]) {
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

const size = Math.min(width, height) / 2;
function project(point, camera, cameraOrientation) {
  const cameraTransformedPoint = rotate(point, camera, cameraOrientation);
  const display = [0, 0, 1];
  const x = (display[2] / cameraTransformedPoint[2]) * cameraTransformedPoint[0] + display[0];
  const y = (display[2] / cameraTransformedPoint[2]) * cameraTransformedPoint[1] + display[1];
  return [(width / 2) + x * size, (height / 2) + y * size];
}

const camera = [0, 0, 0];
const cameraOrientation = [0, 0, 0];
export default function render(_shapes, maxZ, minZ, rotation, offset2 = 0) {
  const offset = -(maxZ - minZ) * 2 + offset2;
  const center = [0, 0, offset];
  const shapes = [];

  // Apply the model transformation
  for (const shape of _shapes) {
    switch (shape.type) {
      // NOTE: Unused in OBJ but supported for the future
      case 'edge': {
        shapes.push({ type: 'edge', from: rotate(shape.from, center, rotation), to: rotate(shape.to, center, rotation) });
        break;
      }
      case 'face': {
        shapes.push({ type: 'face', points: shape.points.map(p => rotate([p[0], p[1], offset + p[2]], center, rotation)) });
        break;
      }
      default: {
        throw new Error(`Invalid shape type ${shape.type}.`);
      }
    }
  }

  // Apply the viewport transformation
  for (const shape of shapes) {
    switch (shape.type) {
      // NOTE: Unused in OBJ but supported for the future
      case 'edge': {
        shape.from = project(shape.from, camera, cameraOrientation);
        shape.to = project(shape.to, camera, cameraOrientation);
        break;
      }
      case 'face': {
        shape.points = shape.points
          // Close the curve
          .concat(shape.points.slice(0, 1))
          .map(point => project(point, camera, cameraOrientation));
        break;
      }
      default: {
        throw new Error(`Invalid shape type ${shape.type}.`);
      }
    }
  }

  return shapes;
}
