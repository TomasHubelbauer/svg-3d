import print3x3 from './print3x3.js';

export default function subtract3x3From3x3(
  /** @type {[[Number, Number, Number], [Number, Number, Number], [Number, Number, Number]]} */ matrix,
  /** @type {[[Number, Number, Number], [Number, Number, Number], [Number, Number, Number]]} */ otherMatrix
) {
  return [
    [
      matrix[0][0] - otherMatrix[0][0],
      matrix[0][1] - otherMatrix[0][1],
      matrix[0][2] - otherMatrix[0][2],
    ],
    [
      matrix[1][0] - otherMatrix[1][0],
      matrix[1][1] - otherMatrix[1][1],
      matrix[1][2] - otherMatrix[1][2],
    ],
    [
      matrix[2][0] - otherMatrix[2][0],
      matrix[2][1] - otherMatrix[2][1],
      matrix[2][2] - otherMatrix[2][2],
    ]
  ];
}

void function test() {
  const matrix = [
    [1, 2, 3],
    [4, 5, 6],
    [7, 8, 9],
  ];

  const otherMatrix = [
    [7, 8, 9],
    [4, 5, 6],
    [1, 2, 3],
  ];

  const resultMatrix = subtract3x3From3x3(matrix, otherMatrix);
  const checkMatrix = [
    [-6, -6, -6],
    [0, 0, 0],
    [6, 6, 6],
  ];

  if (JSON.stringify(resultMatrix) !== JSON.stringify(checkMatrix)) {
    print3x3('matrix', matrix);
    print3x3('other matrix', otherMatrix);
    print3x3('result matrix', resultMatrix);
    print3x3('check matrix', checkMatrix);
  }
}()
