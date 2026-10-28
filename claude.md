# Project Instructions

## Overview

This is a small Node.js project that uses the Anthropic SDK to send requests through a local LiteLLM proxy to a Gemini model.

## Commands

- Install dependencies: `npm install`
- Start the client: `npm start`
- Start the LiteLLM proxy: `litellm --config litellm_config.yaml --port 4000`

The proxy must be running before starting the Node.js client. The client connects through `ANTHROPIC_BASE_URL` in `.env`.

## Configuration

- Keep the model name consistent in `index.js`, `.env`, and `litellm_config.yaml`.
- Do not hardcode API keys or other credentials.
- Do not print, commit, or copy values from `.env` into source files or documentation.
- Keep `.env` out of version control.
- LiteLLM response caching should remain disabled unless explicitly required.

## Code Style

- Use modern ESM JavaScript, matching the existing `package.json` configuration.
- Keep changes small and focused.
- Preserve the existing Anthropic SDK and LiteLLM proxy architecture unless a change specifically requires replacing it.
- Validate JavaScript changes with `node --check index.js` and run `npm start` when the proxy is available.

## Debugging

When diagnosing API failures, first check:

1. The LiteLLM proxy is listening on the port in `ANTHROPIC_BASE_URL`.
2. The model name matches the configured model alias.
3. The provider key is valid and has quota.
4. The request is not enabling prompt or context caching unintentionally.
5. The full error response is inspected before changing retry or temperature settings.
