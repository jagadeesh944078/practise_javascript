function debounce(searchFn, delay) {
  let id;
  let first = true;
  return function optimizedFn(...args) {
    if (first) {
      searchFn(...args);
      first = false;
    } else {
      clearTimeout(id);
      id = setTimeout(() => {
        searchFn(...args);
      }, delay);
    }
  };
}

function print(data, delay) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      console.log(data);
      resolve(data);
    }, delay);
  });
}

let printOptimized = debounce(print, 1000);
printOptimized("i", 1000);
setTimeout(() => {
  printOptimized("ip", 3000);
}, 2000);
setTimeout(() => {
  printOptimized("iph", 1000);
}, 2500);

// setTimeout(() => {
//   printOptimized("ipho", 3000);
// }, 2000);
