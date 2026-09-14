const askGemini = require("./ai/gemini");

async function main() {

    console.log("🤖 MathsFromDB AI");
    console.log("🧠 Connecting to Gemini...");
    console.log("----------------------------");

    try {

        const answer = await askGemini(
            "You are MathsFromDB AI. Reply with: Hello! Gemini is connected successfully."
        );

        console.log("\n✅ Gemini Response:");
        console.log(answer);

    } catch (error) {

        console.log("\n❌ Gemini Error:");
        console.log(error.message);

    }
}

main();