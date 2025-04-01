import { configDotenv } from "dotenv";

configDotenv({ path: ".env", debug: true });

const {
  DISCORD_TOKEN,
  WEBHOOK_ERROR_LOGGING,
  BOT_API_ENDPOINT,
  BASE_API_ENDPOINT,
  BOT_BEARER_TOKEN,
} = process.env;

if (!DISCORD_TOKEN) {
  throw new Error("Missing bot envs!");
}

const SPONSOR_URL = "https://l.devwtf.in/sponsor";

if (
  !WEBHOOK_ERROR_LOGGING) {
  throw new Error("Missing logging webhooks envs!");
}

export const CONFIG = {
  DISCORD_TOKEN,
  WEBHOOK_ERROR_LOGGING,
  BOT_BEARER_TOKEN,
  BOT_API_ENDPOINT,
  BASE_API_ENDPOINT,
  SPONSOR_URL,
};