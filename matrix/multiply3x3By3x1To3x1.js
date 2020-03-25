import print3x3 from './print3x3.js';
import print3x1 from './print3x1.js';

export default function multiply3x3By3x1To3x1(
  /** @type {[Number, Number, Number, Number, Number, Number, Number, Number, Number]} */ matrix,
  /** @type {[Number, Number, Number]} */ otherMatrix
) {
  if (matrix.length !== 9) {
    throw new Error('The matrix must be a 3x3 matrix (9 elements).');
  }

  if (otherMatrix.length !== 3) {
    throw new Error('The other matrix must be a 3x1 matrix (3 elements).');
  }

  // [0][0]=0 [0][1]=1 [0][2]=2
  // [1][0]=3 [1][1]=4 [1][2]=5
  // [2][0]=6 [2][1]=7 [2][2]=8
  return [
    matrix[0] * otherMatrix[0] + matrix[1] * otherMatrix[1] + matrix[2] * otherMatrix[2],
    matrix[3] * otherMatrix[0] + matrix[4] * otherMatrix[1] + matrix[5] * otherMatrix[2],
    matrix[6] * otherMatrix[0] + matrix[7] * otherMatrix[1] + matrix[8] * otherMatrix[2],
  ];
}

void function test() {
  const matrix = [
    1, 2, 3,
    4, 5, 6,
    7, 8, 9,
  ];

  const otherMatrix = [10, 20, 30];
  const resultMatrix = multiply3x3By3x1To3x1(matrix, otherMatrix);
  const checkMatrix = [140, 320, 500];

  if (JSON.stringify(resultMatrix) !== JSON.stringify(checkMatrix)) {
    print3x3('matrix', matrix);
    print3x1('other matrix', otherMatrix);
    print3x1('result matrix', resultMatrix);
    print3x1('check matrix', checkMatrix);
  }
}()
