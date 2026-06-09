function greet(callback) {
  callback();
}

greet(() => {
  console.log("Hello");
});


const promise = new Promise((resolve) => {
  resolve("Promise Resolved");
});

promise.then(console.log);


async function getUsers() {
  try {
    const response = await fetch(
      "https://jsonplaceholder.typicode.com/users"
    );

    const users = await response.json();

    console.log(users);
  } catch (error) {
    console.log(error);
  }
}

getUsers();