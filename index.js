const readline = require("readline");

// ================================
// IMPORT LOCAL SOLVERS
// ================================

const solveLinear = require("./solvers/linear");
const solveQuadratic = require("./solvers/quadratic");
const solveBracket = require("./solvers/bracket");
const solveSimultaneous = require("./solvers/simultaneous");
const solveTrigonometry = require("./solvers/trigonometry");
const solveBasicMath = require("./solvers/basicMath");

const cleanInput = require("./utils/cleanInput");

// ================================
// IMPORT GEMINI AI
// ================================

const askGemini = require("./ai/gemini");

// ================================
// TERMINAL INTERFACE
// ================================

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

// ================================
// START
// ================================

console.log("🤖 MathsFromDB AI");
console.log("🧮 Step-by-Step Maths Solver");
console.log("🧠 AI Maths Tutor");
console.log("----------------------------");

rl.question("Ask your maths question: ", async (input) => {

    const equation = cleanInput(input);

    console.log("\n🔍 Detected question:");
    console.log(equation);

    // ================================
    // LOCAL MATH SOLVERS
    // ================================

    if (solveBasicMath(equation)) {
        rl.close();
        return;
    }

    if (solveTrigonometry(equation)) {
        rl.close();
        return;
    }

    if (solveSimultaneous(equation)) {
        rl.close();
        return;
    }

    if (solveBracket(equation)) {
        rl.close();
        return;
    }

    if (solveQuadratic(equation)) {
        rl.close();
        return;
    }

    if (solveLinear(equation)) {
        rl.close();
        return;
    }

    // ================================
    // GEMINI AI TUTOR
    // ================================

    console.log("\n🤖 Local solver couldn't solve this.");
    console.log("🧠 MathsFromDB AI Tutor is thinking...");
    console.log("----------------------------");

    try {

        const prompt = `
You are "MathsFromDB AI", a friendly expert mathematics tutor.

You are helping school students learn mathematics.

STUDENT QUESTION:
"${input}"

IMPORTANT RULES:

1. Solve the question accurately.
2. Never invent information that is not present in the question.
3. If the question is unclear, explain what information is missing.
4. Show the solution step-by-step.
5. Explain WHY each important step is done.
6. Keep the explanation simple and suitable for a school student.
7. If the student asks a calculation question, show the calculations.
8. If there are multiple methods, use the easiest school-level method first.
9. Give the final answer clearly.
10. If the student writes in Sinhala or Singlish, answer in Sinhala.
11. If the student writes in English, answer in English.
12. Do not unnecessarily repeat the question.
13. Use mathematical notation where useful.
14. Do not add unrelated information.

Use this format when appropriate:

🧮 Solution

Step 1:
...

Step 2:
...

Step 3:
...

💡 Explanation:
...

✅ Final Answer:
...

Remember:
You are a TEACHER, not just an answer generator.
Help the student understand the method.
`;

        const answer = await askGemini(prompt);

        console.log("\n🤖 MathsFromDB AI:");
        console.log("----------------------------");
        console.log(answer);

    } catch (error) {

        console.log("\n❌ Gemini AI Error:");
        console.log(error.message);

    }

    rl.close();
});