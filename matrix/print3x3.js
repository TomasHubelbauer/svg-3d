export default function print3x3(
  /** @type {String} */ title,
  /** @type {[[Number, Number, Number], [Number, Number, Number], [Number, Number, Number]]} */ matrix
) {
  // [0][0]=0 [0][1]=1 [0][2]=2
  // [1][0]=3 [1][1]=4 [1][2]=5
  // [2][0]=6 [2][1]=7 [2][2]=8
  console.log(
    title,
    '\n',
    matrix[0],
    matrix[1],
    matrix[2],
    '\n',
    matrix[3],
    matrix[4],
    matrix[5],
    '\n',
    matrix[6],
    matrix[7],
    matrix[8],
  );
}
