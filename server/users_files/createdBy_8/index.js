const numbers = Array.from({ length: 10 }, () => Math.floor(Math.random() * 100) + 1);

console.log("Original numbers:", numbers);

// Filter even numbers
const evens = numbers.filter(n => n % 2 === 0);

// Double each even number
const doubled = evens.map(n => n * 2);

console.log("Even numbers:", evens);
console.log("Doubled evens:", doubled);