// input : my name is jagadeesh
// output: mY namE iS jagadeesH
// here every word second letter should be in captial letter

let input = "my name is jagadeesh";

function captializeLastLetter(input) {
  const words = input.split(" ");
  const result = words.map((word) => {
    if (word.length > 1) {
      return word.slice(0, -1) + word.slice(-1).toUpperCase();
    } else {
      return word.toUpperCase();
    }
  });
  return result.join(" ");
}
const output = captializeLastLetter(input);
console.log(output);

/* first letter each word should be captial */

function captializeFirstLetter(input) {
  const words = input.split(" ");
  let result = words.map((word, index) => {
    if (word.length > 0) {
      return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
    }
  });
  return result.join(" ");
}
