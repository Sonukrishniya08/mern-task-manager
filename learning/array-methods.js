const nums = [1, 2, 3, 4, 5];

console.log(nums.map(n => n * 2));

console.log(nums.filter(n => n % 2 === 0));

console.log(nums.reduce((a, b) => a + b, 0));

console.log(nums.find(n => n === 3));

nums.forEach(n => console.log(n));

const user = {
  name: "Sonu",
  age: 21
};

console.log(Object.keys(user));
console.log(Object.values(user));
console.log(Object.entries(user));