import print3x3 from './print3x3.js';

export default function multiply3x3By3x3(
    /** @type {[Number, Number, Number, Number, Number, Number, Number, Number, Number]} */ matrix,
  /** @type {[Number, Number, Number, Number, Number, Number, Number, Number, Number]} */ otherMatrix
) {
  if (matrix.length !== 9) {
    throw new Error('The matrix must be a 3x3 matrix (9 elements).');
  }

  if (otherMatrix.length !== 9) {
    throw new Error('The other matrix must be a 3x3 matrix (9 elements).');
  }

  // [0][0]=0 [0][1]=1 [0][2]=2
  // [1][0]=3 [1][1]=4 [1][2]=5
  // [2][0]=6 [2][1]=7 [2][2]=8
  return [
    matrix[0] * otherMatrix[0] + matrix[1] * otherMatrix[3] + matrix[2] * otherMatrix[6],
    matrix[0] * otherMatrix[1] + matrix[1] * otherMatrix[4] + matrix[2] * otherMatrix[7],
    matrix[0] * otherMatrix[2] + matrix[1] * otherMatrix[5] + matrix[2] * otherMatrix[8],
    matrix[3] * otherMatrix[0] + matrix[4] * otherMatrix[3] + matrix[5] * otherMatrix[6],
    matrix[3] * otherMatrix[1] + matrix[4] * otherMatrix[4] + matrix[5] * otherMatrix[7],
    matrix[3] * otherMatrix[2] + matrix[4] * otherMatrix[5] + matrix[5] * otherMatrix[8],
    matrix[6] * otherMatrix[0] + matrix[7] * otherMatrix[3] + matrix[8] * otherMatrix[6],
    matrix[6] * otherMatrix[1] + matrix[7] * otherMatrix[4] + matrix[8] * otherMatrix[7],
    matrix[6] * otherMatrix[2] + matrix[7] * otherMatrix[5] + matrix[8] * otherMatrix[8],
  ];
}

void function test() {
  const matrix = [
    1, 2, 3,
    4, 5, 6,
    7, 8, 9,
  ];

  const otherMatrix = [
    7, 8, 9,
    4, 5, 6,
    1, 2, 3,
  ];

  const resultMatrix = multiply3x3By3x3(matrix, otherMatrix);
  const checkMatrix = [
    18, 24, 30,
    54, 69, 84,
    90, 114, 138,
  ];

  if (JSON.stringify(resultMatrix) !== JSON.stringify(checkMatrix)) {
    print3x3('matrix', matrix);
    print3x3('other matrix', otherMatrix);
    print3x3('result matrix', resultMatrix);
    print3x3('check matrix', checkMatrix);
  }
}()
