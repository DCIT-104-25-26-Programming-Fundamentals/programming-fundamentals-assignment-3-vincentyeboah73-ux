// =============================================================================
// PROGRAMMING FUNDAMENTALS — Assignment 3
// =============================================================================
//
// TASK: Array Statistics Calculator
//
// Write a JavaScript program that reads a collection of numbers from the user
// and computes key statistical values using separate functions.
//
// -----------------------------------------------------------------------------
// HOW TO RUN THIS PROGRAM
// -----------------------------------------------------------------------------
// 1. Install the input library (only once):  npm install readline-sync
// 2. Run the program:                        node assignment_03_array_statistics.js
//
// -----------------------------------------------------------------------------
// EXPECTED INPUT / OUTPUT EXAMPLE
// -----------------------------------------------------------------------------
//
//   How many numbers? 5
//   Enter number 1: 4
//   Enter number 2: 7
//   Enter number 3: 2
//   Enter number 4: 9
//   Enter number 5: 1
//
//   Results:
//   Sum:     23
//   Average: 4.6
//   Maximum: 9
//   Minimum: 1
//
// -----------------------------------------------------------------------------
// REQUIREMENTS
// -----------------------------------------------------------------------------
// - You MUST implement each calculation in its own function (see scaffold).
// - You may NOT use JavaScript's built-in array methods like reduce(),
//   Math.max(), or Math.min(). Implement the logic yourself using loops.
// - N must be a positive integer. If the user enters 0 or a negative number,
//   print an error message and stop.
//
// =============================================================================
// YOUR CODE BELOW — remove the // symbols from the scaffold and fill it in
// =============================================================================
const readline = require("readline-sync");

// Function to calculate the sum of numbers in an array
function calculateSum(numbers) {
  let sum = 0;
  for (let i = 0; i < numbers.length; i++) {
    sum += numbers[i];
  }
  return sum;
}

// Function to calculate the average of numbers in an array
function calculateAverage(numbers) {
  const sum = calculateSum(numbers);
  return sum / numbers.length;
}

// Function to find the maximum number in an array
function findMax(numbers) {
  let max = numbers[0];
  for (let i = 1; i < numbers.length; i++) {
    if (numbers[i] > max) {
      max = numbers[i];
    }
  }
  return max;
}

// Function to find the minimum number in an array
function findMin(numbers) {
  let min = numbers[0];
  for (let i = 1; i < numbers.length; i++) {
    if (numbers[i] < min) {
      min = numbers[i];
    }
  }
  return min;
}

// Main execution function
function main() {
  const countInput = readline.question("How many numbers? ");
  const count = parseInt(countInput);

  // Validate that count is a positive integer
  if (isNaN(count) || count <= 0) {
    console.log("Error: Please enter a positive integer greater than 0.");
    return;
  }

  const numbers = [];

  // Read numbers from user input
  for (let i = 1; i <= count; i++) {
    const input = readline.question(`Enter number ${i}: `);
    numbers.push(parseFloat(input));
  }

  // Calculate results using individual functions
  const sum = calculateSum(numbers);
  const average = calculateAverage(numbers);
  const max = findMax(numbers);
  const min = findMin(numbers);

  // Print results
  console.log("\nResults:");
  console.log(`Sum:     ${sum}`);
  console.log(`Average: ${average}`);
  console.log(`Maximum: ${max}`);
  console.log(`Minimum: ${min}`);
}

// Execute the main program
main();

