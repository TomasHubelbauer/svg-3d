import width from './width.js';
import height from './height.js';
import { mount, reconcile } from './scene.js';

window.addEventListener('load', () => {
  const canvasSvg = document.getElementById('canvasSvg');
  canvasSvg.setAttribute('width', width);
  canvasSvg.setAttribute('height', height);

  let render;
  function go(shapes) {
    canvasSvg.innerHTML = '';
    mount(shapes);
    render = window.requestAnimationFrame(function loop() {
      reconcile();
      render = window.requestAnimationFrame(loop);
    });
  }

  go();

  const previewButton = document.getElementById('previewButton');
  previewButton.addEventListener('click', () => {
    const input = document.createElement('input');
    input.type = 'file';

    input.addEventListener('change', () => {
      if (input.files.length === 0) {
        return;
      }

      if (input.files.length > 2) {
        alert('Multiple files are not supported.');
        return;
      }

      const fileReader = new FileReader();

      fileReader.addEventListener('load', () => {
        const points = [];
        const shapes = [];

        let index = 0;
        const lines = fileReader.result.split('\n');
        for (const line of lines) {
          index++;

          // Skip blank lines
          if (!line) {
            continue;
          }

          // Skip comment lines
          if (line.startsWith('#')) {
            continue;
          }

          const parts = line.split(' ');
          switch (parts[0]) {
            // Ignore material library
            case 'mtllib': {
              continue;
            }
            // Ignore texture coordinates
            case 'vt': {
              continue;
            }
            // Ignore texture normals
            case 'vn': {
              continue;
            }
            // Ignore material assignment
            case 'usemtl': {
              continue;
            }
            case 'v': {
              points.push([Number(parts[1]), Number(parts[2]), Number(parts[3])]);
              break;
            }
            case 'f': {
              const indices = parts.slice(1).map(p => Number(p.split('/')[0]));
              shapes.push({ type: 'face', index, indices, points: indices.map(i => points[i - 1]) });
              break;
            }
            default: {
              alert(`Unexpected command ${parts[0]}`);
              return;
            }
          }
        }

        window.cancelAnimationFrame(render);
        go(shapes);
      });

      fileReader.addEventListener('error', () => {
        alert('Failed to preview the Wavefront file.');
      });

      fileReader.readAsText(input.files[0]);
    });

    input.click();
  });
});
