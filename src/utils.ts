/**
 * Determines whether outArr includes inArr.
 * Works for any type except 'undefined'.
 */
const includesArr = (outArr: any[], inArr: any[]): boolean => {
  return outArr.map((el) => JSON.stringify(el)).includes(JSON.stringify(inArr));
};

export { includesArr };
