const str = "90112233345672";
const output = removeDuplicates(str);
console.log(output);
function removeDuplicates() {
  const arr = str.split("");
  let result = arr.filter((item, index) => {
    return str.indexOf(item) === index;
  });
  return result.join("");
}
