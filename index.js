import width from './width.js';
import height from './height.js';
import render from './render.js';
import parse from './models/parse.js';

window.addEventListener('load', () => {
  const canvasSvg = document.getElementById('canvasSvg');
  canvasSvg.setAttribute('width', width);
  canvasSvg.setAttribute('height', height);

  const infoSpan = document.getElementById('infoSpan');

  let handle;
  function go(mesh) {
    infoSpan.textContent = `${mesh.shapes.length} shapes`;
    window.cancelAnimationFrame(handle);
    render(mesh, canvasSvg);
    handle = window.requestAnimationFrame(function loop() {
      render(mesh, canvasSvg);
      handle = window.requestAnimationFrame(loop);
    });
  }

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
        const mesh = parse(fileReader.result);
        if (!mesh) {
          alert('Failed to load the mesh.');
          return;
        }

        go(mesh);
      });

      fileReader.addEventListener('error', () => {
        alert('Failed to preview the Wavefront file.');
      });

      fileReader.readAsText(input.files[0]);
    });

    input.click();
  });

  for (const model of ['Box', 'Desk', 'Dog'].reverse() /* Counter-act DOM insertion order */) {
    const modelButton = document.createElement('button');
    modelButton.textContent = model;
    modelButton.addEventListener('click', async () => {
      try {
        const response = await fetch('./models/' + model + '.obj');
        const text = await response.text();
        const mesh = parse(text);
        if (!mesh) {
          alert('Failed to load the mesh.');
          return;
        }

        go(mesh);
      }
      catch (error) {
        alert('Failed to load the model.');
        throw error;
      }
    });

    canvasSvg.insertAdjacentElement('afterend', modelButton);
    if (model === 'Box') {
      modelButton.click();
    }
  }
});
