let age = 21;
console.log(age);

const name = "Sonu";
console.log(name);

var city = "Jaipur";
console.log(city);

const add = (a, b) => a + b;
console.log(add(10, 20));

console.log(`Welcome ${name}`);

const numbers = [1, 2, 3];
const [a, b] = numbers;
console.log(a, b);

const person = {
  userName: "Sonu",
  userAge: 21
};

const { userName, userAge } = person;

console.log(userName);
console.log(userAge);


const arr1 = [1, 2];
const arr2 = [...arr1, 3, 4];
console.log(arr2);


function sum(...nums) {
  return nums.reduce((x, y) => x + y, 0);
}

console.log(sum(1, 2, 3, 4));