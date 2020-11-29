import project from './project.js';

export default function animate(width, height, shapes, frames, duration = 5) {
  const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
  svg.setAttribute('xmlns', 'http://www.w3.org/2000/svg');
  svg.setAttribute('width', width);
  svg.setAttribute('height', height);

  const points = shapes.map(() => []);

  for (const frame of frames) {
    // Add the 3D to 2D projection after the frame transformations
    frame.push(point => project(width, height, point));

    for (let shapeIndex = 0; shapeIndex < shapes.length; shapeIndex++) {
      const shape = { ...shapes[shapeIndex] };
      if (shape.type !== 'edge' && shape.type !== 'face') {
        throw new Error(`Unknown shape type ${shape.type}.`);
      }

      // Apply frame transformations to the shape
      for (const transform of frame) {
        switch (shape.type) {
          case 'edge': {
            shape.from = transform(shape.from);
            shape.to = transform(shape.to);
            break;
          }
          case 'face': {
            // Repeat the first point at the end to close the loop for four edges
            shape.points = shape.points.concat(shape.points.slice(0, 1)).map(transform);
            break;
          }
        }
      }

      // Collect the coordinates for the SVG string
      // TODO: Do this by adding this as a transformation at the end of `frame`
      switch (shape.type) {
        case 'edge': {
          points[shapeIndex].push(`${~~shape.from[0]},${~~shape.from[1]} ${~~shape.to[0]},${~~shape.to[1]}`);
          break;
        }
        case 'face': {
          points[shapeIndex].push(shape.points.map(p => p.map(p => ~~p).join(',')).join(' '));
          break;
        }
      }
    }
  }

  for (let shapeIndex = 0; shapeIndex < shapes.length; shapeIndex++) {
    svg.append('\n');

    const polyline = document.createElementNS('http://www.w3.org/2000/svg', 'polyline');
    polyline.setAttribute('stroke', 'black');
    polyline.setAttribute('fill', 'none');
    svg.append(polyline);

    const animate = document.createElementNS('http://www.w3.org/2000/svg', 'animate');
    animate.setAttribute('attributeName', 'points');
    animate.setAttribute('values', points[shapeIndex].join(';'));
    animate.setAttribute('dur', `${duration}s`);
    animate.setAttribute('repeatCount', 'indefinite');
    polyline.append(animate);
  }

  return svg;
}
