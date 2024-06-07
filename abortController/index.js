const controller = new AbortController();
const url = "https://jsonplaceholder.typicode.com/todos/1";

const fetchTodo = async () => {
  try {
    const data = await fetch(url, { signal: controller.signal });
    const json = await data.json();
    console.log(json);
  } catch (err) {
    if (err.name === "AbortError") {
      console.log("aborted because of me:", err);
    }
  }
};

fetchTodo();
controller.abort();
