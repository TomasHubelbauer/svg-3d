import width from './width.js';
import height from './height.js';
import render from './render.js';
import mount from './mount.js';
import parse from 'https://tomashubelbauer.github.io/esm-obj/index.js';
import plot from 'https://tomashubelbauer.github.io/esm-svg-timeseries/index.js';

window.addEventListener('load', () => {
  const canvasSvg = document.getElementById('canvasSvg');
  canvasSvg.setAttribute('width', width);
  canvasSvg.setAttribute('height', height);

  const infoSpan = document.getElementById('infoSpan');
  const plotSvg = document.getElementById('plotSvg');

  let handle;
  function go(mesh) {
    // Cache the shapes so that they can be cloned for mutability
    const shapesText = JSON.stringify(mesh.shapes);

    infoSpan.textContent = `${mesh.shapes.length} shapes`;
    window.cancelAnimationFrame(handle);

    // Clear the SVG to mount instead of attempt to reconcile
    canvasSvg.innerHTML = '';

    const data = [];
    let stick = 0;
    handle = window.requestAnimationFrame(function loop() {
      const stamp = performance.now();
      let shapes = JSON.parse(shapesText);
      shapes = render(shapes, mesh.maxZ, mesh.minZ);
      const value = performance.now() - stamp;
      if (value > stick) {
        stick = value;
      }

      data.push({ stamp: new Date(), value });
      if (data.length === 100) {
        data.shift();
      }

      plot(plotSvg, data, 0, stick);
      const average = ~~(data.reduce((a, c) => a + c.value, 0) / data.length);
      document.title = average;
      mount(canvasSvg, shapes);
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

  for (const model of ['Box', 'Prism', 'Desk', 'Dog', 'Cat', 'Cottage', 'Sofa']) {
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

    previewButton.insertAdjacentElement('beforebegin', modelButton);
    if (model === 'Box') {
      modelButton.click();
    }
  }
});
