const fs = require("fs");
const path = require("path");

function detectMimeType(buffer) {

    // JPEG
    if (
        buffer[0] === 0xFF &&
        buffer[1] === 0xD8 &&
        buffer[2] === 0xFF
    ) {
        return "image/jpeg";
    }

    // PNG
    if (
        buffer[0] === 0x89 &&
        buffer[1] === 0x50 &&
        buffer[2] === 0x4E &&
        buffer[3] === 0x47
    ) {
        return "image/png";
    }

    // WEBP
    if (
        buffer.toString("ascii", 0, 4) === "RIFF" &&
        buffer.toString("ascii", 8, 12) === "WEBP"
    ) {
        return "image/webp";
    }

    return null;
}

async function solveMathImage(imagePath) {

    const apiKey = process.env.GEMINI_API_KEY;

    if (!apiKey) {
        throw new Error(
            "GEMINI_API_KEY is missing in .env file."
        );
    }

    if (!fs.existsSync(imagePath)) {
        throw new Error(
            `Image not found: ${imagePath}`
        );
    }

    // Read image
    const imageData = fs.readFileSync(imagePath);

    // Check file size
    const sizeMB = imageData.length / (1024 * 1024);

    console.log(`📁 Image size: ${sizeMB.toFixed(2)} MB`);

    if (sizeMB > 20) {
        throw new Error(
            "Image is larger than 20 MB. Please use a smaller image."
        );
    }

    // Detect REAL image type
    const mimeType = detectMimeType(imageData);

    if (!mimeType) {
        throw new Error(
            "Unsupported or invalid image. Please use a real JPG, PNG or WEBP image."
        );
    }

    console.log(`🖼️ Detected format: ${mimeType}`);

    // Convert image to Base64
    const base64Image = imageData.toString("base64");

    // Load Gemini SDK
    const { GoogleGenAI } = await import("@google/genai");

    const ai = new GoogleGenAI({
        apiKey: apiKey
    });

    console.log("📤 Sending image to Gemini...");

    const response = await ai.models.generateContent({

        model: "gemini-3.6-flash",

        contents: [
            {
                inlineData: {
                    mimeType: mimeType,
                    data: base64Image
                }
            },

            {
                text: `
You are MathsFromDB AI, an expert mathematics tutor.

Look carefully at the mathematics question in this image.

Your tasks:

1. Read the question accurately.
2. Identify exactly what the question asks.
3. Solve it correctly.
4. Show the solution step-by-step.
5. Show important calculations.
6. Give the final answer clearly.
7. Do not guess if the image is unclear.
8. If something cannot be read, clearly say what is unclear.
9. If the question is in Sinhala, answer in Sinhala.
10. If the question is in English, answer in English.
11. Keep the explanation suitable for a school student.

Use this format:

📷 Question:
[Detected question]

🧮 Solution:

Step 1:
...

Step 2:
...

Step 3:
...

✅ Final Answer:
...
`
            }
        ]

    });

    return response.text;
}

module.exports = solveMathImage;