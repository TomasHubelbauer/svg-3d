import rotate from './rotate.js';

const display = [0, 0, 1];
const camera = [0, 0, 0];
const cameraOrientation = [0, 0, 0];
export default function project(width, height, point) {
  const cameraTransformedPoint = rotate(point, camera, cameraOrientation);
  const x = (display[2] / cameraTransformedPoint[2]) * cameraTransformedPoint[0] + display[0];
  const y = (display[2] / cameraTransformedPoint[2]) * cameraTransformedPoint[1] + display[1];
  const size = Math.min(width, height) / 2;
  return [(width / 2) + x * size, (height / 2) + y * size];
}
