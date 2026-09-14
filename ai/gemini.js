async function askGemini(prompt) {

    const apiKey = process.env.GEMINI_API_KEY;

    if (!apiKey) {
        throw new Error(
            "GEMINI_API_KEY is missing in .env file."
        );
    }

    const { GoogleGenAI } = await import("@google/genai");

    const ai = new GoogleGenAI({
        apiKey: apiKey
    });

    const response = await ai.models.generateContent({
        model: "gemini-3.6-flash",
        contents: prompt
    });

    if (!response.text) {
        throw new Error(
            "Gemini returned an empty response."
        );
    }

    return response.text;
}

module.exports = askGemini;