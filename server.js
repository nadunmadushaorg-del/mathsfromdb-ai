require("dotenv").config();

const express = require("express");
const fs = require("fs");
const path = require("path");
const os = require("os");

const mathEngine = require("./mathEngine");
const solveMathImage = require("./ai/geminiImage");

const app = express();
app.use(express.json());

const PORT = process.env.PORT || 3000;

const VERIFY_TOKEN = process.env.WHATSAPP_VERIFY_TOKEN;
const ACCESS_TOKEN = process.env.WHATSAPP_ACCESS_TOKEN;
const PHONE_NUMBER_ID = process.env.WHATSAPP_PHONE_NUMBER_ID;

// ================================
// HOME
// ================================

app.get("/", (req, res) => {
    res.send("🤖 MathsFromDB AI WhatsApp Server is running!");
});

// ================================
// WEBHOOK VERIFICATION
// ================================

app.get("/webhook", (req, res) => {

    const mode = req.query["hub.mode"];
    const token = req.query["hub.verify_token"];
    const challenge = req.query["hub.challenge"];

    if (mode === "subscribe" && token === VERIFY_TOKEN) {

        console.log("✅ WhatsApp Webhook Verified!");

        return res.status(200).send(challenge);
    }

    console.log("❌ Webhook verification failed.");

    return res.sendStatus(403);
});

// ================================
// RECEIVE MESSAGES
// ================================

app.post("/webhook", async (req, res) => {

    console.log("\n📩 WhatsApp webhook received!");

    res.sendStatus(200);

    try {

        const body = req.body;

        if (body.object !== "whatsapp_business_account") {
            return;
        }

        const entries = body.entry || [];

        for (const entry of entries) {

            const changes = entry.changes || [];

            for (const change of changes) {

                const value = change.value;

                if (!value || !value.messages) {
                    continue;
                }

                for (const message of value.messages) {

                    // ==========================================
                    // TEXT
                    // ==========================================

                    if (message.type === "text") {

                        const from = message.from;
                        const text = message.text.body.trim();

                        console.log(`👤 Student: ${from}`);
                        console.log(`🧮 Question: ${text}`);

                        try {

                            console.log(
                                "🧠 Sending question to Maths Engine..."
                            );

                            const answer =
                                await mathEngine(text);

                            console.log(
                                "✅ Maths Engine answer received!"
                            );

                            await sendWhatsAppMessage(
                                from,
                                answer
                            );

                        } catch (error) {

                            console.error(
                                "❌ Text AI Error:",
                                error.message
                            );

                            await sendWhatsAppMessage(
                                from,
                                "🤖 MathsFromDB AI\n\n⚠️ Sorry, I couldn't solve that question right now.\n\nPlease try again."
                            );
                        }
                    }

                    // ==========================================
                    // IMAGE
                    // ==========================================

                    else if (message.type === "image") {

                        const from = message.from;
                        const mediaId = message.image.id;

                        console.log(
                            `🖼️ Maths image received from ${from}`
                        );

                        console.log(
                            `🆔 Media ID: ${mediaId}`
                        );

                        try {

                            await sendWhatsAppMessage(
                                from,
                                "📸 Maths question received!\n\n🧠 I'm reading the question and solving it..."
                            );

                            const mediaUrl =
                                await getWhatsAppMediaUrl(
                                    mediaId
                                );

                            const imagePath =
                                await downloadWhatsAppMedia(
                                    mediaUrl,
                                    mediaId,
                                    message.image.mime_type
                                );

                            console.log(
                                "🧠 Sending image to Gemini..."
                            );

                            const answer =
                                await solveMathImage(
                                    imagePath
                                );

                            console.log(
                                "✅ Gemini image solution received!"
                            );

                            await sendWhatsAppMessage(
                                from,
                                answer
                            );

                            try {

                                fs.unlinkSync(imagePath);

                                console.log(
                                    "🗑️ Temporary image deleted."
                                );

                            } catch (e) {

                                console.log(
                                    "⚠️ Could not delete temporary image."
                                );
                            }

                        } catch (error) {

                            console.error(
                                "❌ Image AI Error:",
                                error.message
                            );

                            await sendWhatsAppMessage(
                                from,
                                "🤖 MathsFromDB AI\n\n⚠️ I couldn't read that maths question clearly.\n\nPlease send a clearer photo."
                            );
                        }
                    }

                    // ==========================================
                    // OTHER MESSAGE TYPES
                    // ==========================================

                    else {

                        console.log(
                            `ℹ️ Message type: ${message.type}`
                        );
                    }
                }
            }
        }

    } catch (error) {

        console.error(
            "❌ Webhook Error:",
            error.message
        );
    }
});

// ================================
// GET MEDIA URL
// ================================

async function getWhatsAppMediaUrl(mediaId) {

    const url =
        `https://graph.facebook.com/v23.0/${mediaId}`;

    const response = await fetch(url, {

        method: "GET",

        headers: {
            "Authorization":
                `Bearer ${ACCESS_TOKEN}`
        }
    });

    const data =
        await response.json();

    if (!response.ok) {

        console.error(
            "❌ Media URL Error:",
            JSON.stringify(data, null, 2)
        );

        throw new Error(
            data.error?.message ||
            "Could not get WhatsApp media URL"
        );
    }

    return data.url;
}

// ================================
// DOWNLOAD MEDIA
// ================================

async function downloadWhatsAppMedia(
    mediaUrl,
    mediaId,
    mimeType
) {

    const response =
        await fetch(
            mediaUrl,
            {
                method: "GET",

                headers: {
                    "Authorization":
                        `Bearer ${ACCESS_TOKEN}`
                }
            }
        );

    if (!response.ok) {

        throw new Error(
            "Could not download WhatsApp image."
        );
    }

    const buffer =
        Buffer.from(
            await response.arrayBuffer()
        );

    let extension = ".jpg";

    if (mimeType === "image/png") {
        extension = ".png";
    }

    if (mimeType === "image/webp") {
        extension = ".webp";
    }

    const filePath =
        path.join(
            os.tmpdir(),
            `maths_${mediaId}${extension}`
        );

    fs.writeFileSync(
        filePath,
        buffer
    );

    console.log(
        `📁 Image size: ${(buffer.length / (1024 * 1024)).toFixed(2)} MB`
    );

    return filePath;
}

// ================================
// SEND WHATSAPP
// ================================

async function sendWhatsAppMessage(
    to,
    text
) {

    const url =
        `https://graph.facebook.com/v23.0/${PHONE_NUMBER_ID}/messages`;

    console.log(
        "📤 Sending WhatsApp reply..."
    );

    const response =
        await fetch(
            url,
            {
                method: "POST",

                headers: {
                    "Authorization":
                        `Bearer ${ACCESS_TOKEN}`,

                    "Content-Type":
                        "application/json"
                },

                body: JSON.stringify({

                    messaging_product:
                        "whatsapp",

                    recipient_type:
                        "individual",

                    to: to,

                    type: "text",

                    text: {
                        preview_url: false,
                        body: text
                    }
                })
            }
        );

    const data =
        await response.json();

    if (!response.ok) {

        console.error(
            "❌ WhatsApp API Error:",
            JSON.stringify(data, null, 2)
        );

        throw new Error(
            data.error?.message ||
            "WhatsApp API request failed"
        );
    }

    console.log(
        "✅ WhatsApp message sent!"
    );

    return data;
}

// ================================
// START SERVER
// ================================

app.listen(PORT, () => {

    console.log("");
    console.log("🤖 MathsFromDB AI");
    console.log("📱 WhatsApp Webhook Server");
    console.log("🧠 Maths Engine + Gemini");
    console.log("📸 Gemini Image Solver");
    console.log("----------------------------");

    console.log(
        `🚀 Server running on port ${PORT}`
    );

    console.log(
        `🌐 http://localhost:${PORT}`
    );

    console.log("");
});