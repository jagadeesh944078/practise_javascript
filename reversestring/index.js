const sentence = "my name is javascript";

//logic 1
function reverseString(input) {
  const arr = input.split("");
  const reverseWord = [];
  for (let i = arr.length - 1; i >= 0; i--) {
    reverseWord.push(arr[i]);
  }
  return reverseWord.join("");
}

const output = reverseString(sentence);
console.log(output);

//logic 2

const arr = string.split("");
const reverseArr = arr.reverse().join("");
console.log(reverseArr);

//logic 3
const reverseString = (str) =>
  [...str]
    .map((char, index, array) => {
      return array[array.length - 1 - index];
    })
    .join("");

console.log(reverseString(string));

//logic 4

const reverseString = (str) =>
  [...str].reduce((reversed, char) => {
    return char + reversed;
  }, "");

console.log(reverseString(string));
