import width from './width.js';
import height from './height.js';

const size = Math.min(width, height) / 2;

const step1 = Math.PI / 2;
const step2 = Math.PI;
const step3 = Math.PI * 1.5;

function* render() {
  const t = window.performance.now() / 1000;
  const s = Math.abs(Math.sin(t));

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
      const x = (width / 2) + (point[0] * (5 / point[2])) * size;
      const y = (height / 2) + (point[1] * (5 / point[2])) * size;
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
