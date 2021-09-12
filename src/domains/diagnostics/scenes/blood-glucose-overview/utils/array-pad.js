export const padArrayWithValue = (array, length, value) => {
  let paddedArray = array.slice();
  for (
    let arrayIndex = array.length - 1;
    arrayIndex < length - 1;
    arrayIndex += 1
  ) {
    paddedArray = [...paddedArray, value];
  }

  return paddedArray;
};
