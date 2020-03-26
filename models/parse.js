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

  // TODO: Add support for CRLF
  const lines = text.split('\n');
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
        const indices = parts.slice(1).map(p => Number(p.split('/')[0]));
        shapes.push({ type: 'face', points: indices.map(i => points[i - 1]) });
        break;
      }
      default: {
        alert(`Unexpected command ${parts[0]}`);
        return;
      }
    }
  }

  return { minX, maxX, minY, maxY, minZ, maxZ, shapes };
}
