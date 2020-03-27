export default function parse(text) {
  const points = [];
  let minX;
  let maxX;
  let minY;
  let maxY;
  let minZ;
  let maxZ;
  const shapes = [];

  let index = 0;

  const lines = text.split(/\r?\n/g);
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
        const x = Number(parts[1]);
        const y = Number(parts[2]);
        const z = Number(parts[3]);

        if (Number.isNaN(x)) {
          alert(`Invalid number '${parts[1]}' on line ${index}: '${line}'.`);
          return;
        }

        if (Number.isNaN(y)) {
          alert(`Invalid number '${parts[2]}' on line ${index}: '${line}'.`);
          return;
        }

        if (Number.isNaN(z)) {
          alert(`Invalid number '${parts[3]}' on line ${index}: '${line}'.`);
          return;
        }

        if (minX === undefined || x < minX) {
          minX = x;
        }

        if (maxX === undefined || x > maxX) {
          maxX = x;
        }

        if (minY === undefined || y < minY) {
          minY = y;
        }

        if (maxY === undefined || y > maxY) {
          maxY = y;
        }

        if (minZ === undefined || z < minZ) {
          minZ = z;
        }

        if (maxZ === undefined || z > maxZ) {
          maxZ = z;
        }

        points.push([x, y, z]);
        break;
      }
      case 'f': {
        /** @type {Number[]} */
        const p = [];
        for (const part of parts.slice(1)) {
          // Ignore "empty" part at the end of line or in case of multiple spaces
          if (!part) {
            continue;
          }

          const i = Number(part.split('/')[0]);

          if (Number.isNaN(i)) {
            alert(`Invalid number '${part}' on line ${index}: '${line}'.`);
            return;
          }

          const point = points[i - 1];
          if (!point) {
            alert(`Invalid index '${i}' on line ${index}: '${line}'.`);
            return;
          }

          p.push(point);
        }

        shapes.push({ type: 'face', points: p });
        break;
      }
      // Ignore grouping commands
      case 'g': {
        continue;
      }
      // Ignore grouping commands
      case 's': {
        continue;
      }
      // Ignore object name
      case 'o': {
        continue;
      }
      default: {
        alert(`Unexpected command '${parts[0]}' on line ${index}: '${line}'.`);
        return;
      }
    }
  }

  return { minX, maxX, minY, maxY, minZ, maxZ, shapes };
}
