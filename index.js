import scenes from './scenes/index.js';

window.addEventListener('load', () => {
  const canvasDiv = document.getElementById('canvasDiv');
  const sceneDiv = document.getElementById('sceneDiv');
  const infoDiv = document.getElementById('infoDiv');

  for (const scene of scenes) {
    const sceneButton = document.createElement('button');
    sceneButton.textContent = scene.name;
    sceneButton.addEventListener('click', async () => {
      const svg = await scene.default();

      const downloadA = document.createElement('a');
      downloadA.href = 'data:application/svg,' + encodeURIComponent(svg.outerHTML);
      downloadA.download = `${scene.name}.svg`;
      downloadA.textContent = 'Download';

      infoDiv.innerHTML = '';
      infoDiv.append(downloadA);

      canvasDiv.innerHTML = '';
      canvasDiv.append(svg);
    });

    sceneDiv.append(sceneButton);
    if (scene.name === 'Me') {
      sceneButton.click();
    }
  }
});
