import width from './width.js';
import height from './height.js';
//import { mount, reconcile } from './test1.js';
import { mount, reconcile } from './test2.js';

window.addEventListener('load', () => {
  const canvasSvg = document.getElementById('canvasSvg');
  canvasSvg.setAttribute('width', width);
  canvasSvg.setAttribute('height', height);

  mount();
  window.requestAnimationFrame(function loop() {
    reconcile();
    window.requestAnimationFrame(loop);
  });
});
