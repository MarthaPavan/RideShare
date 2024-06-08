const obj = [
  { name: "John", age: 25, city: "New York" },
  { name: "Jane", age: 22, city: "San Francisco" },
  { name: "Tom", age: 30, city: "Los Angeles" },
  { name: "Harry", age: 27, city: "Chicago" },
];

const names = obj.map((item) => item.name);

console.log(names);
