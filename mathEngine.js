const solveBasicMath = require("./solvers/basicMath");
const solveBracket = require("./solvers/bracket");
const solveLinear = require("./solvers/linear");
const solveQuadratic = require("./solvers/quadratic");
const solveSimultaneous = require("./solvers/simultaneous");
const solveTrigonometry = require("./solvers/trigonometry");
const solveTrigIdentity = require("./solvers/trigIdentity");

const askGemini = require("./ai/gemini");

// ==================================================
// NORMALIZE INPUT
// ==================================================

function normalizeInput(input) {
    return input
        .replace(/²/g, "^2")
        .replace(/³/g, "^3")
        .replace(/×/g, "*")
        .replace(/÷/g, "/")
        .replace(/−/g, "-")
        .replace(/\s+/g, "")
        .trim()
        .toLowerCase();
}

// ==================================================
// CLEAN NATURAL LANGUAGE
// ==================================================

function cleanNaturalMathQuestion(input) {
    return input
        .replace(/xඑකේඅගයසොයන්න/g, "")
        .replace(/xගේඅගයසොයන්න/g, "")
        .replace(/xසොයන්න/g, "")
        .replace(/xඅගයසොයන්න/g, "")
        .replace(/solve/g, "")
        .replace(/findx/g, "")
        .replace(/findthevalueofx/g, "")
        .replace(/valueofx/g, "")
        .replace(/:/g, "")
        .trim();
}

// ==================================================
// HELP MENU
// ==================================================

function getHelpMessage() {
    return `🤖 MathsFromDB AI

👋 Welcome!

I'm your AI Mathematics Tutor. 📚

🧮 What I can do:

• Basic Mathematics
• Linear Equations
• Quadratic Equations
• Simultaneous Equations
• Trigonometry
• Inverse Trigonometry
• Trigonometric Identities
• Maths questions from photos 📸

🌐 Languages:
• Sinhala 🇱🇰
• English 🇬🇧

📸 You can also send me a clear photo of a maths question.

💡 Example:

2x + 5 = 15

or

x² + 5x + 6 = 0

or simply send a maths question photo. 📷

Let's solve maths together! 🧠📐`;
}

// ==================================================
// CAPTURE LOCAL SOLVER OUTPUT
// ==================================================

function runLocalSolver(solver, input) {

    const originalLog = console.log;

    let output = "";

    console.log = (...args) => {
        output += args.join(" ") + "\n";
    };

    try {

        const result = solver(input);

        if (result === true && output.trim()) {
            return output.trim();
        }

        return null;

    } catch (error) {

        return null;

    } finally {

        console.log = originalLog;

    }
}

// ==================================================
// MATH ENGINE
// ==================================================

async function mathEngine(input) {

    if (!input || !input.trim()) {
        return "🤖 Please send a mathematics question.";
    }

    const originalQuestion = input.trim();

    // ==================================================
    // COMMAND
    // ==================================================

    const command = originalQuestion
        .toLowerCase()
        .trim();

    // ==================================================
    // HELP
    // ==================================================

    if (
        command === "help" ||
        command === "/help" ||
        command === "menu" ||
        command === "/menu"
    ) {
        return getHelpMessage();
    }

    // ==================================================
    // GREETINGS
    // ==================================================

    const greetings = [
        "hi",
        "hello",
        "hey",
        "hii",
        "hiii",
        "ayubowan",
        "ආයුබෝවන්",
        "හායි"
    ];

    if (greetings.includes(command)) {

        return `🤖 MathsFromDB AI

👋 Hello! Welcome!

📚 I'm ready to help you with mathematics.

🧮 Send me a maths question or 📸 a photo of your question.

Type "help" anytime to see what I can do. 😌`;

    }

    // ==================================================
    // THANKS
    // ==================================================

    const thanksMessages = [
        "thanks",
        "thank you",
        "thankyou",
        "thx",
        "tnq",
        "thank u",
        "thanks bro",
        "thank you bro",
        "ස්තුතියි",
        "ස්තූතියි"
    ];

    if (thanksMessages.includes(command)) {

        return `🤖 MathsFromDB AI

😊 You're welcome!

📚 Happy to help you with mathematics anytime.

If you have another question, just send it! 🧮✨`;

    }

    // ==================================================
    // NORMALIZE
    // ==================================================

    const question =
        normalizeInput(originalQuestion);

    const naturalMathQuestion =
        cleanNaturalMathQuestion(question);

    console.log("");
    console.log("🧠 Maths Engine");
    console.log("----------------------------");

    console.log(
        `📌 Original: ${originalQuestion}`
    );

    console.log(
        `🔧 Normalized: ${question}`
    );

    console.log(
        `🧹 Cleaned: ${naturalMathQuestion}`
    );

    // ==================================================
    // LOCAL SOLVERS
    // ==================================================

    const solvers = [

        {
            name: "Basic Mathematics",
            solve: solveBasicMath
        },

        {
            name: "Bracket Equation",
            solve: solveBracket
        },

        {
            name: "Linear Equation",
            solve: solveLinear
        },

        {
            name: "Quadratic Equation",
            solve: solveQuadratic
        },

        {
            name: "Simultaneous Equations",
            solve: solveSimultaneous
        },

        {
            name: "Trigonometry",
            solve: solveTrigonometry
        },

        {
            name: "Trigonometric Identity",
            solve: solveTrigIdentity
        }

    ];

    // ==================================================
    // TRY NORMAL INPUT
    // ==================================================

    for (const solver of solvers) {

        console.log(
            `🔎 Trying ${solver.name}...`
        );

        const answer =
            runLocalSolver(
                solver.solve,
                question
            );

        if (answer) {

            console.log(
                `✅ ${solver.name} matched!`
            );

            return `🤖 MathsFromDB AI\n\n${answer}`;

        }

    }

    // ==================================================
    // TRY CLEANED NATURAL LANGUAGE
    // ==================================================

    if (naturalMathQuestion !== question) {

        console.log(
            "🔎 Trying cleaned natural-language question..."
        );

        for (const solver of solvers) {

            const answer =
                runLocalSolver(
                    solver.solve,
                    naturalMathQuestion
                );

            if (answer) {

                console.log(
                    `✅ ${solver.name} matched after cleaning!`
                );

                return `🤖 MathsFromDB AI\n\n${answer}`;

            }

        }

    }

    // ==================================================
    // GEMINI FALLBACK
    // ==================================================

    console.log(
        "🤖 No local solver matched."
    );

    console.log(
        "🧠 Sending question to Gemini..."
    );

    const prompt = `
You are "MathsFromDB AI", a professional and friendly mathematics tutor for Sri Lankan school students.

STUDENT QUESTION:
${originalQuestion}

================================
LANGUAGE
================================

- Sinhala question → answer mainly in Sinhala.
- English question → answer in English.
- Sinhala + English → naturally mix both.

================================
SOLVING
================================

1. Understand the question carefully.
2. Identify exactly what is being asked.
3. Choose the correct mathematical method.
4. Show important steps.
5. Explain important steps briefly.
6. Show calculations clearly.
7. Check the answer when practical.
8. Never guess.
9. If information is missing, ask for clarification.
10. If a diagram is required but missing, ask the student to send it.

================================
LEVEL
================================

Suitable for:

- Grade 6–11
- G.C.E. O/L
- G.C.E. A/L

================================
STYLE
================================

Be like a good private mathematics teacher.

Keep the answer clear and not unnecessarily long.

Use:

🤖 MathsFromDB AI

📌 Question:
...

🧠 Method:
...

📝 Solution:

Step 1:
...

Step 2:
...

Step 3:
...

✅ Final Answer:
...

💡 Tip:
...

Only include 💡 Tip when useful.

================================
NON-MATH QUESTIONS
================================

If this is not a mathematics question, reply:

"🤖 I'm MathsFromDB AI, your mathematics tutor. Send me a mathematics question and I'll help you solve it step-by-step. 📚"
`;

    try {

        const answer =
            await askGemini(prompt);

        console.log(
            "✅ Gemini answer received!"
        );

        return answer;

    } catch (error) {

        console.error(
            "❌ Gemini Error:",
            error.message
        );

        return `
🤖 MathsFromDB AI

⚠️ Sorry, I couldn't solve that question right now.

Please try again.
`;

    }
}

module.exports = mathEngine;