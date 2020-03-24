export default function print3x3(
  /** @type {String} */ title,
  /** @type {[[Number, Number, Number], [Number, Number, Number], [Number, Number, Number]]} */ matrix
) {
  console.log(
    title,
    '\n',
    matrix[0][0],
    matrix[0][1],
    matrix[0][2],
    '\n',
    matrix[1][0],
    matrix[1][1],
    matrix[1][2],
    '\n',
    matrix[2][0],
    matrix[2][1],
    matrix[2][2],
  );
}
