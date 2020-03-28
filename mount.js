export default function mount(canvasSvg, shapes) {
  // Mount new mesh
  if (canvasSvg.children.length === 0) {
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


    canvasSvg.append(fragment);
    return;
  }

  // Reconcile the DOM changes
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
