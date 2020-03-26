import subtract3x1From3x1 from './matrix/subtract3x1From3x1.js';
import add3x1To3x1 from './matrix/add3x1To3x1.js';
import multiply3x3By3x3 from './matrix/multiply3x3By3x3.js';
import multiply3x3By3x1To3x1 from './matrix/multiply3x3By3x1To3x1.js';
import width from './width.js';
import height from './height.js';

const size = Math.min(width, height) / 2;

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

function project(point, camera, cameraOrientation) {
  const cameraTransformedPoint = rotate(point, camera, cameraOrientation);
  const display = [0, 0, 1];
  const x = (display[2] / cameraTransformedPoint[2]) * cameraTransformedPoint[0] + display[0];
  const y = (display[2] / cameraTransformedPoint[2]) * cameraTransformedPoint[1] + display[1];
  return [(width / 2) + x * size, (height / 2) + y * size];
}

let _mesh;
export default function render(mesh, canvasSvg) {
  const t = window.performance.now() / 1000;
  const camera = [0, 0, 0];
  const cameraOrientation = [0, 0, 0];
  const shapes = [];
  const offset = -(mesh.maxZ - mesh.minZ) * 2;
  const center = [0, 0, offset];
  const rotation = [t, t, t];

  // Apply the model transformation
  for (const shape of mesh.shapes) {
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

  // Mount new mesh
  if (mesh !== _mesh) {
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
