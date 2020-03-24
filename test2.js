import subtract3x1From3x1 from './matrix/subtract3x1From3x1.js';
import multiply3x3By3x3 from './matrix/multiply3x3By3x3.js';
import multiply3x3By3x1To3x1 from './matrix/multiply3x3By3x1To3x1.js';
import width from './width.js';
import height from './height.js';

const size = Math.min(width, height) / 2;

const step1 = Math.PI / 2;
const step2 = Math.PI;
const step3 = Math.PI * 1.5;

function project(point, camera, cameraOrientation) {
  const rotationAroundX = [
    [1, 0, 0],
    [0, Math.cos(cameraOrientation[0]), Math.sin(cameraOrientation[0])],
    [0, -Math.sin(cameraOrientation[0]), Math.cos(cameraOrientation[0])],
  ];

  const rotationAroundY = [
    [Math.cos(cameraOrientation[1]), 0, -Math.sin(cameraOrientation[1])],
    [0, 1, 0],
    [Math.sin(cameraOrientation[1]), 0, Math.cos(cameraOrientation[1])],
  ];

  const rotationAroundZ = [
    [Math.cos(cameraOrientation[2]), Math.sin(cameraOrientation[2]), 0],
    [-Math.sin(cameraOrientation[2]), Math.cos(cameraOrientation[2]), 0],
    [0, 0, 1],
  ];

  const pointMinusCamera = subtract3x1From3x1(point, camera);

  const cameraTransformedPoint = multiply3x3By3x1To3x1(multiply3x3By3x3(multiply3x3By3x3(rotationAroundX, rotationAroundY), rotationAroundZ), pointMinusCamera);

  const display = [0, 0, 5];

  const x = (display[2] / cameraTransformedPoint[2]) * cameraTransformedPoint[0] + display[0];
  const y = (display[2] / cameraTransformedPoint[2]) * cameraTransformedPoint[1] + display[1];

  return [x, y];
}

function* render() {
  const t = window.performance.now() / 1000;
  const s = Math.abs(Math.sin(t));

  const camera = [0, 0, 0];
  const cameraOrientation = [Math.sin(t) / 10, Math.cos(t) / 10, Math.tan(t) / 100];

  const leftTopBack = [Math.sin(t) * s, Math.cos(t) * s, -10];
  const leftTopFront = [Math.sin(t) * s, Math.cos(t) * s, -10 + s * 3];
  const leftBottomBack = [Math.sin(t + step1) * s, Math.cos(t + step1) * s, -10];
  const leftBottomFront = [Math.sin(t + step1) * s, Math.cos(t + step1) * s, -10 + s * 3];
  const rightBottomBack = [Math.sin(t + step2) * s, Math.cos(t + step2) * s, -10];
  const rightBottomFront = [Math.sin(t + step2) * s, Math.cos(t + step2) * s, -10 + s * 3];
  const rightTopBack = [Math.sin(t + step3) * s, Math.cos(t + step3) * s, -10];
  const rightTopFront = [Math.sin(t + step3) * s, Math.cos(t + step3) * s, -10 + s * 3];

  const polylines = [
    [...leftTopBack, ...leftTopFront],
    [...leftBottomBack, ...leftBottomFront],
    [...rightBottomBack, ...rightBottomFront],
    [...rightTopBack, ...rightTopFront],
    [...leftTopBack, ...leftBottomBack, ...rightBottomBack, ...rightTopBack],
    [...leftTopFront, ...leftBottomFront, ...rightBottomFront, ...rightTopFront],
  ];

  for (const polyline of polylines) {
    const points = polyline.reduce((a, c, i, s) => i % 3 === 0 ? [...a, s.slice(i, i + 3)] : a, []);

    // Make the polyline self-meeting
    points.push(points[0]);

    let polylinePoints = '';
    for (const point of points) {
      let [x, y] = project(point, camera, cameraOrientation);
      x = (width / 2) + x * size;
      y = (height / 2) + y * size;
      polylinePoints += x + ',' + y + ' ';
    }

    yield polylinePoints;
  }
}

export function mount() {
  const polylines = render();
  const fragment = document.createDocumentFragment();
  for (const polyline of polylines) {
    const polylinePolyline = document.createElementNS('http://www.w3.org/2000/svg', 'polyline');
    polylinePolyline.setAttribute('points', polyline);
    polylinePolyline.setAttribute('stroke', 'black');
    polylinePolyline.setAttribute('fill', 'none');

    fragment.append(polylinePolyline);
  }

  canvasSvg.append(fragment);
}

export function reconcile() {
  const polylines = render();
  let index = 0;
  for (const polyline of polylines) {
    const polylinePolyline = canvasSvg.children[index];
    if (!polylinePolyline || polylinePolyline.tagName !== 'polyline') {
      throw new Error('The DOM has changed unexpectedly.');
    }

    polylinePolyline.setAttribute('points', polyline);
    index++;
  }

  if (canvasSvg.children.length !== index) {
    throw new Error('The DOM has changed unexpectedly.');
  }
}
