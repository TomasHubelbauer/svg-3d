import subtract3x1From3x1 from './matrix/subtract3x1From3x1.js';
import add3x1To3x1 from './matrix/add3x1To3x1.js';
import multiply3x3By3x3 from './matrix/multiply3x3By3x3.js';
import multiply3x3By3x1To3x1 from './matrix/multiply3x3By3x1To3x1.js';
import width from './width.js';
import height from './height.js';

const size = Math.min(width, height) / 2;

function makeRotationMatrix(x, y, z) {
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

  return multiply3x3By3x3(multiply3x3By3x3(rotationAroundX, rotationAroundY), rotationAroundZ);
}

function transformAroundOrigin(point, origin, matrix) {
  const pointToOrigin = subtract3x1From3x1(point, origin);
  const originTransformedPoint = multiply3x3By3x1To3x1(matrix, pointToOrigin);
  const [x, y, z] = add3x1To3x1(originTransformedPoint, origin);
  point[0] = x;
  point[1] = y;
  point[2] = z;
}

const display = [0, 0, 1];
function project(point, camera, cameraOrientation) {
  transformAroundOrigin(point, camera, cameraOrientation);
  const x = (display[2] / point[2]) * point[0] + display[0];
  const y = (display[2] / point[2]) * point[1] + display[1];
  point[0] = (width / 2) + x * size;
  point[1] = (height / 2) + y * size;

  // Remove the last element (instead of `delete point[2]` to update `length` too)
  point.splice(2, 1);
}

let _mesh;
let _shapes;
export default function render(mesh, canvasSvg) {
  // Cache stringified shapes to parse a mutable copy from on each render
  if (mesh !== _mesh) {
    _shapes = JSON.stringify(mesh.shapes);
  }

  const t = window.performance.now() / 1000;
  const camera = [0, 0, 0];
  const cameraOrientation = makeRotationMatrix(0, 0, 0);
  const offset = (mesh.maxZ - mesh.minZ) * -2;
  const center = [0, 0, offset];
  const rotation = makeRotationMatrix(t, t, t);

  // Clone the shapes to make them mutable
  const shapes = JSON.parse(_shapes);
  for (const shape of shapes) {
    switch (shape.type) {
      // NOTE: Unused in OBJ but supported for the future
      case 'edge': {
        // Apply the model transformation
        transformAroundOrigin(shape.from, center, rotation);
        transformAroundOrigin(shape.to, center, rotation);

        // Apply the viewport transformation
        project(shape.from, camera, cameraOrientation);
        project(shape.to, camera, cameraOrientation);
        break;
      }
      case 'face': {
        for (const point of shape.points) {
          // Apply the model transformation
          transformAroundOrigin(point, center, rotation);

          // Apply the viewport transformation
          project(point, camera, cameraOrientation);
        }

        // Close the loop
        shape.points.push(shape.points[0]);
        break;
      }
      default: {
        throw new Error(`Invalid shape type ${shape.type}.`);
      }
    }
  }

  // Mount new mesh
  if (mesh !== _mesh) {
    _mesh = mesh;

    const fragment = document.createDocumentFragment();
    for (const shape of shapes) {
      switch (shape.type) {
        case 'edge': {
          const line = document.createElementNS('http://www.w3.org/2000/svg', 'line');
          line.setAttribute('x1', shape.from[0]);
          line.setAttribute('y1', shape.from[1]);
          line.setAttribute('x2', shape.to[0]);
          line.setAttribute('y2', shape.to[1]);
          line.setAttribute('stroke', 'black');
          line.setAttribute('fill', 'none');
          fragment.append(line);
          break;
        }
        case 'face': {
          const polyline = document.createElementNS('http://www.w3.org/2000/svg', 'polyline');
          polyline.setAttribute('points', shape.points);
          polyline.setAttribute('stroke', 'black');
          polyline.setAttribute('fill', 'none');
          fragment.append(polyline);
          break;
        }
        default: {
          throw new Error(`Invalid shape type ${shape.type}.`);
        }
      }
    }

    canvasSvg.innerHTML = '';
    canvasSvg.append(fragment);
  }
  // Reconcile the DOM changes
  else {
    let index = 0;
    for (const shape of shapes) {
      const element = canvasSvg.children[index];
      if (!element) {
        throw new Error('The DOM has changed unexpectedly.');
      }

      switch (shape.type) {
        case 'edge': {
          if (element.tagName !== 'line') {
            throw new Error('The DOM has changed unexpectedly.');
          }

          element.setAttribute('x1', shape.from[0]);
          element.setAttribute('y1', shape.from[1]);
          element.setAttribute('x2', shape.to[0]);
          element.setAttribute('y2', shape.to[1]);
          break;
        }
        case 'face': {
          if (element.tagName !== 'polyline') {
            throw new Error('The DOM has changed unexpectedly.');
          }

          element.setAttribute('points', shape.points);
          break;
        }
        default: {
          throw new Error(`Invalid shape type ${shape.type}.`);
        }
      }

      index++;
    }

    if (canvasSvg.children.length !== index) {
      throw new Error('The DOM has changed unexpectedly.');
    }
  }
}
