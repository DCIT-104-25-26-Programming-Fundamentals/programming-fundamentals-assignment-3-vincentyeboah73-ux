const readline = require("readline");

// Create standard interface for reading input
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

// Helper function to ask a question as a Promise
function askQuestion(query) {
  return new Promise((resolve) => rl.question(query, resolve));
}

// PART A — Generate first N terms of Fibonacci sequence
function generateFibonacci(n) {
  if (n <= 0) return [];
  const sequence = [0];
  if (n === 1) return sequence;

  sequence.push(1);
  for (let i = 2; i < n; i++) {
    sequence.push(sequence[i - 1] + sequence[i - 2]);
  }
  return sequence;
}

// PART B — Check if a number is a Fibonacci number
function isFibonacci(target) {
  if (target < 0) return false;

  let a = 0;
  let b = 1;

  if (target === a || target === b) return true;

  while (b < target) {
    const next = a + b;
    a = b;
    b = next;
  }

  return b === target;
}

// Main execution function
async function main() {
  console.log("=== PART A: PRINT FIRST N TERMS ===");
  const countInput = await askQuestion("How many terms? ");
  const n = parseInt(countInput);

  if (isNaN(n) || n <= 0) {
    console.log("Error: Please enter a positive integer greater than 0.");
  } else {
    const fibTerms = generateFibonacci(n);
    console.log(`Fibonacci sequence: ${fibTerms.join(" ")}`);
  }

  console.log("\n===================================");
  console.log("=== PART B: CHECK FIBONACCI NUMBER ===");
  const checkInput = await askQuestion("Enter a number to check: ");
  const numToCheck = parseInt(checkInput);

  if (isNaN(numToCheck)) {
    console.log("Error: Please enter a valid number.");
  } else {
    if (isFibonacci(numToCheck)) {
      console.log(`${numToCheck} is a Fibonacci number.`);
    } else {
      console.log(`${numToCheck} is NOT a Fibonacci number.`);
    }
  }

  rl.close();
}

// Execute program
main();