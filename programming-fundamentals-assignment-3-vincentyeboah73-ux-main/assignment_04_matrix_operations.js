// =============================================================================
// PROGRAMMING FUNDAMENTALS — Assignment 4
// =============================================================================
//
// TASK: Matrix Operations
//
// Write a JavaScript program that performs three operations on matrices
// (2D arrays), each implemented in its own function.
//
// In JavaScript, a matrix is represented as an array of arrays:
//   let matrix = [[1, 2, 3], [4, 5, 6]];   // 2 rows, 3 columns
//
// -----------------------------------------------------------------------------
// HOW TO RUN THIS PROGRAM
// -----------------------------------------------------------------------------
// 1. Install the input library (only once):  npm install readline-sync
// 2. Run the program:                        node assignment_04_matrix_operations.js
//
// -----------------------------------------------------------------------------
// PART A — Transpose a Matrix
// -----------------------------------------------------------------------------
// - Read an M x N matrix from the user.
// - Compute and display its transpose (rows become columns, columns become rows).
//
// Example (2 x 3 input):
//
//   Original Matrix:      Transposed Matrix:
//   1  2  3               1  4
//   4  5  6               2  5
//                         3  6
//
// -----------------------------------------------------------------------------
// PART B — Add Two Matrices
// -----------------------------------------------------------------------------
// - Read two matrices of exactly the same size (M x N).
// - Compute their element-wise sum and display the result.
//
// -----------------------------------------------------------------------------
// PART C — Multiply Two Matrices
// -----------------------------------------------------------------------------
// - Read matrix A of size M x N and matrix B of size N x P.
//   (Number of COLUMNS in A must equal number of ROWS in B.)
// - Compute and display the matrix product A x B (result is M x P).
//
// -----------------------------------------------------------------------------
// EXPECTED INPUT FORMAT
// -----------------------------------------------------------------------------
// When entering a row, the user types all values on one line separated by spaces:
//
//   Enter number of rows: 2
//   Enter number of columns: 3
//   Enter row 1: 1 2 3
//   Enter row 2: 4 5 6
//
// Hint: Use row.split(' ').map(Number) to convert a line of text into an array
// of numbers.
//
// -----------------------------------------------------------------------------
// REQUIREMENTS
// -----------------------------------------------------------------------------
// - Use nested loops for all operations (no external libraries).
// - Each operation must be in its own function (see scaffold below).
// - Display each matrix in a neat, aligned grid format.
// - Tip: Complete Part A first, then Parts B and C.
//

// =============================================================================
// YOUR CODE BELOW — remove the // symbols from the scaffold and fill it in
// =============================================================================

const readlineSync = require('readline-sync');

// Helper function to read a matrix from user input
function readMatrix(rows, cols, matrixName = "") {
  const prefix = matrixName ? `${matrixName} - ` : "";
  const matrix = [];
  
  for (let i = 0; i < rows; i++) {
    const input = readlineSync.question(`Enter ${prefix}row ${i + 1}: `);
    // Split line by spaces and convert strings to numbers
    const row = input.trim().split(/\s+/).map(Number);
    matrix.push(row);
  }
  
  return matrix;
}

// Helper function to print a matrix neatly formatted
function printMatrix(matrix) {
  for (let i = 0; i < matrix.length; i++) {
    console.log(matrix[i].join(" "));
  }
}

// PART A — Transpose a Matrix (Rows become columns, columns become rows)
function transposeMatrix(matrix) {
  const rows = matrix.length;
  const cols = matrix[0].length;
  const result = [];

  for (let i = 0; i < cols; i++) {
    const newRow = [];
    for (let j = 0; j < rows; j++) {
      newRow.push(matrix[j][i]);
    }
    result.push(newRow);
  }

  return result;
}

// PART B — Add Two Matrices (Element-wise sum)
function addMatrices(matrixA, matrixB) {
  const rows = matrixA.length;
  const cols = matrixA[0].length;
  const result = [];

  for (let i = 0; i < rows; i++) {
    const newRow = [];
    for (let j = 0; j < cols; j++) {
      newRow.push(matrixA[i][j] + matrixB[i][j]);
    }
    result.push(newRow);
  }

  return result;
}

// PART C — Multiply Two Matrices (M x N multiplied by N x P)
function multiplyMatrices(matrixA, matrixB) {
  const rowsA = matrixA.length;
  const colsA = matrixA[0].length;
  const colsB = matrixB[0].length;
  const result = [];

  for (let i = 0; i < rowsA; i++) {
    const newRow = [];
    for (let j = 0; j < colsB; j++) {
      let sum = 0;
      for (let k = 0; k < colsA; k++) {
        sum += matrixA[i][k] * matrixB[k][j];
      }
      newRow.push(sum);
    }
    result.push(newRow);
  }

  return result;
}

// Main execution function to test all parts
function main() {
  console.log("=== PART A: TRANSPOSE MATRIX ===");
  const rowsA = parseInt(readlineSync.question("Enter number of rows: "));
  const colsA = parseInt(readlineSync.question("Enter number of columns: "));
  const matrixA = readMatrix(rowsA, colsA);

  console.log("\nOriginal Matrix:");
  printMatrix(matrixA);

  console.log("\nTransposed Matrix:");
  const transposed = transposeMatrix(matrixA);
  printMatrix(transposed);

  console.log("\n=================================");
  console.log("=== PART B: ADD TWO MATRICES ===");
  console.log(`Using same dimensions (${rowsA}x${colsA}) for Matrix 2:`);
  const matrixB = readMatrix(rowsA, colsA, "Matrix B");

  console.log("\nSum Matrix (A + B):");
  const sumMatrix = addMatrices(matrixA, matrixB);
  printMatrix(sumMatrix);

  console.log("\n=================================");
  console.log("=== PART C: MULTIPLY TWO MATRICES ===");
  console.log(`Matrix A is ${rowsA}x${colsA}. Matrix C rows must equal ${colsA}.`);
  const colsC = parseInt(readlineSync.question("Enter number of columns for Matrix C: "));
  const matrixC = readMatrix(colsA, colsC, "Matrix C");

  console.log("\nProduct Matrix (A x C):");
  const productMatrix = multiplyMatrices(matrixA, matrixC);
  printMatrix(productMatrix);
}

// Execute program
main();

