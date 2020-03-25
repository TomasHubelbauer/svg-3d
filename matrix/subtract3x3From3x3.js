import print3x3 from './print3x3.js';

export default function subtract3x3From3x3(
  /** @type {[Number, Number, Number, Number, Number, Number, Number, Number, Number]} */ matrix,
  /** @type {[Number, Number, Number, Number, Number, Number, Number, Number, Number]} */ otherMatrix
) {
  // [0][0]=0 [0][1]=1 [0][2]=2
  // [1][0]=3 [1][1]=4 [1][2]=5
  // [2][0]=6 [2][1]=7 [2][2]=8
  return [
    matrix[0] - otherMatrix[0],
    matrix[1] - otherMatrix[1],
    matrix[2] - otherMatrix[2],
    matrix[3] - otherMatrix[3],
    matrix[4] - otherMatrix[4],
    matrix[5] - otherMatrix[5],
    matrix[6] - otherMatrix[6],
    matrix[7] - otherMatrix[7],
    matrix[8] - otherMatrix[8],
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

  const resultMatrix = subtract3x3From3x3(matrix, otherMatrix);
  const checkMatrix = [
    -6, -6, -6,
    0, 0, 0,
    6, 6, 6,
  ];

  if (JSON.stringify(resultMatrix) !== JSON.stringify(checkMatrix)) {
    print3x3('matrix', matrix);
    print3x3('other matrix', otherMatrix);
    print3x3('result matrix', resultMatrix);
    print3x3('check matrix', checkMatrix);
  }
}()
