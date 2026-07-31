// =============================================================================
// PROGRAMMING FUNDAMENTALS — Assignment 8
// =============================================================================
//
// TASK: Student Record Management System
//
// Build a console-based program that stores and manages student information.
// Each student is represented as a JavaScript object containing:
//
//   - name   : the student's full name  (string)
//   - id     : a unique student ID number (number, e.g. 20240001)
//   - scores : an array of scores from multiple assessments (e.g. [75, 88, 90])
//
// Example object:
//   { name: "Alice Mensah", id: 20240001, scores: [78, 85, 90] }
//
// -----------------------------------------------------------------------------
// HOW TO RUN THIS PROGRAM
// -----------------------------------------------------------------------------
// 1. Install the input library (only once):  npm install readline-sync
// 2. Run the program:                        node assignment_08_student_records.js
//
// -----------------------------------------------------------------------------
// FEATURES YOUR PROGRAM MUST SUPPORT
// -----------------------------------------------------------------------------
//
//   1. Add a Student
//      - Ask the user to enter the student's name and ID.
//      - Ask how many scores to enter, then collect each score one by one.
//      - Save the student object and confirm it was added.
//
//   2. Display All Students
//      - Print a formatted table showing every student's:
//          Name, ID, individual scores, and their average score.
//      - If no students have been added yet, print a message saying so.
//
//   3. Calculate Average Score for a Specific Student
//      - Ask the user to enter a student ID.
//      - Find the student and print their average score.
//      - If the ID is not found, print an error message.
//
//   4. Quit
//
// -----------------------------------------------------------------------------
// HOW THE MENU SHOULD LOOK
// -----------------------------------------------------------------------------
//
//   ================================
//      STUDENT RECORD SYSTEM MENU
//   ================================
//   1. Add student
//   2. Display all students
//   3. Calculate average score
//   4. Quit
//   Enter your choice (1-4):
//
// -----------------------------------------------------------------------------
// EXPECTED INTERACTION EXAMPLE
// -----------------------------------------------------------------------------
//
//   Enter your choice (1-4): 1
//   Student name: Alice Mensah
//   Student ID: 20240001
//   How many scores? 3
//   Enter score 1: 78
//   Enter score 2: 85
//   Enter score 3: 90
//   Student "Alice Mensah" added successfully.
//
//   Enter your choice (1-4): 3
//   Enter student ID: 20240001
//   Alice Mensah's average score: 84.33
//
// -----------------------------------------------------------------------------
// REQUIREMENTS
// -----------------------------------------------------------------------------
// - Store all student records in an array of objects.
// - Average scores must be displayed to 2 decimal places (use .toFixed(2)).
// - Each feature MUST be in its own function (see scaffold below).
// - Handle invalid menu choices and missing student IDs gracefully.
//

// =============================================================================
// YOUR CODE BELOW — remove the // symbols from the scaffold and fill it in
// =============================================================================


const readline = require("readline");

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

function askQuestion(query) {
  return new Promise((resolve) => rl.question(query, resolve));
}

let students = [];

function calculateAverage(scores) {
  if (scores.length === 0) return 0;
  let sum = 0;
  for (let i = 0; i < scores.length; i++) {
    sum += scores[i];
  }
  return sum / scores.length;
}

async function addStudent() {
  const name = (await askQuestion("Student name: ")).trim();
  if (name === "") {
    console.log("Error: Student name cannot be empty.");
    return;
  }

  const idInput = (await askQuestion("Student ID: ")).trim();
  const id = parseInt(idInput);
  if (isNaN(id)) {
    console.log("Error: Invalid Student ID.");
    return;
  }

  const countInput = (await askQuestion("How many scores? ")).trim();
  const scoreCount = parseInt(countInput);
  if (isNaN(scoreCount) || scoreCount <= 0) {
    console.log("Error: Score count must be a positive integer.");
    return;
  }

  const scores = [];
  for (let i = 1; i <= scoreCount; i++) {
    const scoreInput = (await askQuestion(`Enter score ${i}: `)).trim();
    const score = parseFloat(scoreInput);
    if (isNaN(score)) {
      console.log("Error: Invalid score entered. Defaulting to 0.");
      scores.push(0);
    } else {
      scores.push(score);
    }
  }

  students.push({ name, id, scores });
  console.log(`Student "${name}" added successfully.`);
}

function displayAllStudents() {
  if (students.length === 0) {
    console.log("\nNo student records available.");
    return;
  }

  console.log("\n================ ALL STUDENTS ================");
  for (let i = 0; i < students.length; i++) {
    const s = students[i];
    const avg = calculateAverage(s.scores).toFixed(2);
    console.log(
      `ID: ${s.id} | Name: ${s.name} | Scores: [${s.scores.join(", ")}] | Average: ${avg}`
    );
  }
  console.log("==============================================");
}

async function calculateStudentAverage() {
  if (students.length === 0) {
    console.log("\nNo student records available.");
    return;
  }

  const idInput = (await askQuestion("\nEnter student ID: ")).trim();
  const id = parseInt(idInput);

  if (isNaN(id)) {
    console.log("Error: Invalid Student ID.");
    return;
  }

  let foundStudent = null;
  for (let i = 0; i < students.length; i++) {
    if (students[i].id === id) {
      foundStudent = students[i];
      break;
    }
  }

  if (foundStudent) {
    const avg = calculateAverage(foundStudent.scores).toFixed(2);
    console.log(`${foundStudent.name}'s average score: ${avg}`);
  } else {
    console.log(`Error: Student with ID ${id} not found.`);
  }
}

function showMenu() {
  console.log("\n================================");
  console.log("   STUDENT RECORD SYSTEM MENU   ");
  console.log("================================");
  console.log("1. Add student");
  console.log("2. Display all students");
  console.log("3. Calculate average score");
  console.log("4. Quit");
}

async function main() {
  let running = true;

  while (running) {
    showMenu();
    const choice = (await askQuestion("Enter your choice (1-4): ")).trim();

    switch (choice) {
      case "1":
        await addStudent();
        break;
      case "2":
        displayAllStudents();
        break;
      case "3":
        await calculateStudentAverage();
        break;
      case "4":
        console.log("Goodbye!");
        running = false;
        rl.close();
        break;
      default:
        console.log("Error: Invalid choice. Please enter a number between 1 and 4.");
    }
  }
}

main();