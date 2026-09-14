const solveMathImage = require("./ai/geminiImage");

async function main() {

    console.log("🤖 MathsFromDB AI");
    console.log("📸 Image Maths Solver");
    console.log("🧠 Connecting to Gemini...");
    console.log("----------------------------");

    const imagePath = "./images/question.jpg";

    try {

        const answer = await solveMathImage(imagePath);

        console.log("\n✅ Gemini AI Answer:");
        console.log("----------------------------");

        console.log(answer);

    } catch (error) {

        console.log("\n❌ Error:");
        console.log(error.message);

    }
}

main();