/**
  * @param {string} txt - The text that will be sliced.
  * @param {number} [max=50] - The maximum length that will the text will be sliced in.
  * @returns The sliced text, with an ellipsis (...) appended if truncated.
*/

export function txtSlicer(txt: string, max: number = 50){
  if(txt.length > max) return `${txt.slice(0, max)}...`;
  return txt;
}