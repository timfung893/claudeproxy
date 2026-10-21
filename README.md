# Anthropic API Test

A minimal Node.js script that sends one message through the Anthropic API.

## Setup

1. Copy `.env.example` to `.env`.
2. Put your Anthropic API key in `.env` or export `ANTHROPIC_API_KEY` in your shell.
3. Install dependencies:

```sh
npm install
```

## Run

```sh
npm start
```

The SDK reads `ANTHROPIC_API_KEY` from the environment automatically.