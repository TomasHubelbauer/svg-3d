import parse from 'https://tomashubelbauer.github.io/esm-obj/index.js';

export default function pick() {
  return new Promise((resolve, reject) => {
    const input = document.createElement('input');
    input.type = 'file';

    input.addEventListener('change', () => {
      if (input.files.length === 0) {
        return;
      }

      if (input.files.length > 2) {
        reject('Multiple files are not supported.');
        return;
      }

      const fileReader = new FileReader();

      fileReader.addEventListener('load', () => {
        const mesh = parse(fileReader.result);
        if (!mesh) {
          reject('Failed to load the mesh.');
          return;
        }

        resolve(mesh);
      });

      fileReader.addEventListener('error', reject);

      fileReader.readAsText(input.files[0]);
    });

    input.click();
  });
}
