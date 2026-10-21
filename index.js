import "dotenv/config";
import Anthropic from "@anthropic-ai/sdk";
import process from 'node:process';

process.loadEnvFile();
const client = new Anthropic();

const message = await client.messages.create({
    model: "gemini-3.8-flash",
    max_tokens: 256,
    messages: [
        {
            role: "user",
            content: "How does the Anthropic API work?",
        },
    ],
});

const text = message.content
    .filter((block) => block.type === "text")
    .map((block) => block.text)
    .join("\n");

console.log(text || "The API returned no text content.");


