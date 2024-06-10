// Iterators
/* iterators and generators bring the concept of iteration directly into the core language and provide a mechanism for customizing the behavior of forof loops */
/* how it know it should traverse from left to right here because inside array it has build in iteratior method  */
/* evrytime you cannot work with buit in iterators sometimes you should add own custom iterator because diffrent datatypes like trees linkedlist for diffrent types of datatypes 
   we have diffrent iteration protocols such as (functions* and Generator) (yield and yield*) */

// for (const val of [1, 2, 3, 4, 5]) {
//   console.log(val);
// }

function makeIterator(start = 0, end = Infinity, step = 1) {
  let nextStart = start;
  let iterationCount = 0;
  return {
    next() {
      let result;
      if (iterationCount < end) {
        result = { value: nextStart, done: false };
        nextStart = nextStart + step;
        iterationCount++;
        return result;
      }
      return { value: iterationCount, done: true };
    },
  };
}

const myIterator = makeIterator(10, 20, 1);
let result = myIterator.next();

while (!result.done) {
  console.log(result);
  result = myIterator.next();
}

// function* count() {
//   yield 2;
//   yield 4;
//   yield 6;
//   yield 8;
//   yield 10;
//   yield 12;
// }

// const even = count();

// for (const v of even) {
//   console.log(v);
// }

function* makeMyIteratorNew(start, end, stepSize) {
  for (let i = start; i <= end; i += stepSize) {
    yield i;
  }
}

const one = makeMyIteratorNew(1, 20, 2);
for (const val of one) {
  console.log(val);
}
