import width from './width.js';
import height from './height.js';
import render from './render.js';

export default function animate(mesh) {
  const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
  svg.setAttribute('xmlns', 'http://www.w3.org/2000/svg');
  svg.setAttribute('width', width);
  svg.setAttribute('height', height);

  const points = mesh.shapes.map(() => []);

  for (let lazySusan = 0; lazySusan <= Math.PI * 2; lazySusan += Math.PI / 20) {
    const shapes = render(mesh.shapes, mesh.maxZ, mesh.minZ, [lazySusan, lazySusan, lazySusan]);
    for (let shapeIndex = 0; shapeIndex < shapes.length; shapeIndex++) {
      const shape = shapes[shapeIndex];
      points[shapeIndex].push(shape.points.map(p => p.map(p => ~~p).join(',')).join(' '));
    }
  }

  for (let shapeIndex = 0; shapeIndex < mesh.shapes.length; shapeIndex++) {
    svg.append('\n');

    const polyline = document.createElementNS('http://www.w3.org/2000/svg', 'polyline');
    polyline.setAttribute('stroke', 'black');
    polyline.setAttribute('fill', 'none');
    svg.append(polyline);


    const animate = document.createElementNS('http://www.w3.org/2000/svg', 'animate');
    animate.setAttribute('attributeName', 'points');
    animate.setAttribute('values', points[shapeIndex].join(';'));
    animate.setAttribute('dur', '5s');
    animate.setAttribute('repeatCount', 'indefinite');
    polyline.append(animate);
  }

  return svg;
}
