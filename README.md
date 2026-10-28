# Anthropic API Test

A minimal Node.js script that uses Anthropic API for CCDV-F practice.
We will test out Anthropic API format by using liteLLM proxy to route Anthropic client to Gemini API.

Guide book for CCDV-F: https://github.com/vkorost/claude-certified-developer-guide.

## Setup

Flow:

- Claude Code → Anthropic format → LiteLLM → OpenAI format → Gemini

Steps:

1. Put your Google AI studio API key in `.env` or export `ANTHROPIC_API_KEY` in your shell.
2. Install Claude CLI, Anthropic SDK, liteLLM.
2. Setup litellm-config.yaml.
3. Check python version for suitability. Run liteLLM locally.
4. Route the API to a specified Gemini model (currently using 3.8).

```sh
npm install
```

## Run

```sh
npm start
```

The SDK reads `ANTHROPIC_API_KEY` from the environment automatically.
