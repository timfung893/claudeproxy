import "dotenv/config";
import Anthropic from "@anthropic-ai/sdk";
import { createServer } from "node:http";
import { readFile } from "node:fs/promises";
import { fileURLToPath } from "node:url";
import process from "node:process";

process.loadEnvFile();
const client = new Anthropic();
const port = Number(process.env.APP_PORT || 3001);
const maxOutputTokens = 4096;
const model = process.env.ANTHROPIC_MODEL || "gemini-3.8-flash";
const indexPath = fileURLToPath(new URL("./public/index.html", import.meta.url));

async function readRequestBody(request) {
    let body = "";

    for await (const chunk of request) {
        body += chunk;
        if (body.length > 1_000_000) {
            throw new Error("Request is too large.");
        }
    }

    return JSON.parse(body || "{}");
}

function sendJson(response, status, payload) {
    response.writeHead(status, { "Content-Type": "application/json; charset=utf-8" });
    response.end(JSON.stringify(payload));
}

const server = createServer(async (request, response) => {
    if (request.method === "GET" && request.url === "/") {
        const html = await readFile(indexPath, "utf8");
        response.writeHead(200, { "Content-Type": "text/html; charset=utf-8" });
        response.end(html);
        return;
    }

    if (request.method === "POST" && request.url === "/api/chat") {
        try {
            const { prompt } = await readRequestBody(request);

            if (typeof prompt !== "string" || !prompt.trim()) {
                sendJson(response, 400, { error: "Enter a prompt first." });
                return;
            }

            const message = await client.messages.create({
                model,
                max_tokens: maxOutputTokens,
                messages: [{ role: "user", content: prompt.trim() }],
            });

            const text = message.content
                .filter((block) => block.type === "text")
                .map((block) => block.text)
                .join("\n");

            console.log('Text: ' + JSON.stringify(text));
            console.log('Res: ' + JSON.stringify(message.stop_reason));

            sendJson(response, 200, {
                text,
                stopReason: message.stop_reason,
                outputTokens: message.usage?.output_tokens,
            });
        } catch (error) {
            console.error("Request failed:", error);
            sendJson(response, 500, { error: error.message || "The request failed." });
        }
        return;
    }

    response.writeHead(404, { "Content-Type": "text/plain; charset=utf-8" });
    response.end("Not found");
});

server.listen(port, () => {
    console.log(`Claude UI running at http://localhost:${port}`);
});



