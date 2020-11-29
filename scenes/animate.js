import project from './project.js';

// TODO: Improve the API using union types (for repeat and poster)
export default function animate(width, height, objects, frames, duration = 5, stroke, repeat, poster) {
  const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
  svg.setAttribute('xmlns', 'http://www.w3.org/2000/svg');
  svg.setAttribute('width', width);
  svg.setAttribute('height', height);

  const points = {};

  for (const frame of frames) {
    // Add the 3D to 2D projection after the frame transformations
    frame.push(point => project(width, height, point));

    for (let objectIndex = 0; objectIndex < objects.length; objectIndex++) {
      const shapes = objects[objectIndex];
      for (let shapeIndex = 0; shapeIndex < shapes.length; shapeIndex++) {
        const shape = { ...shapes[shapeIndex] };
        if (shape.type !== 'edge' && shape.type !== 'face') {
          throw new Error(`Unknown shape type ${shape.type}.`);
        }

        // Apply frame transformations to the shape
        for (const transform of frame) {
          switch (shape.type) {
            case 'edge': {
              shape.from = transform(shape.from, objectIndex, shapeIndex);
              shape.to = transform(shape.to, objectIndex, shapeIndex);
              break;
            }
            case 'face': {
              // Repeat the first point at the end to close the loop for four edges
              shape.points = shape.points.concat(shape.points.slice(0, 1)).map(point => transform(point, objectIndex, shapeIndex));
              break;
            }
          }
        }


        // Collect the coordinates for the SVG string
        // TODO: Do this by adding this as a transformation at the end of `frame`
        if (!points[`${objectIndex}-${shapeIndex}`]) {
          points[`${objectIndex}-${shapeIndex}`] = [];
        }

        switch (shape.type) {
          case 'edge': {
            points[`${objectIndex}-${shapeIndex}`].push(`${~~shape.from[0]},${~~shape.from[1]} ${~~shape.to[0]},${~~shape.to[1]}`);
            break;
          }
          case 'face': {
            points[`${objectIndex}-${shapeIndex}`].push(shape.points.map(p => p.map(p => ~~p).join(',')).join(' '));
            break;
          }
        }
      }
    }
  }

  for (const key in points) {
    svg.append('\n');

    const polyline = document.createElementNS('http://www.w3.org/2000/svg', 'polyline');
    polyline.setAttribute('stroke', 'black');
    if (stroke) {
      polyline.setAttribute('stroke-width', stroke);
      polyline.setAttribute('stroke-linecap', 'round');
    }

    polyline.setAttribute('fill', 'none');
    if (!repeat) {
      polyline.setAttribute('points', points[key][poster]);
    }

    svg.append(polyline);

    const animate = document.createElementNS('http://www.w3.org/2000/svg', 'animate');
    animate.setAttribute('attributeName', 'points');
    animate.setAttribute('values', points[key].join(';'));
    animate.setAttribute('dur', `${duration}s`);
    animate.setAttribute('repeatCount', repeat ? 'indefinite' : 0);
    polyline.append(animate);
  }

  return svg;
}
