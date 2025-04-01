import { WebhookClient } from "discord.js";
import { CONFIG } from "../configs/config";

export const log_error = new WebhookClient({
  url: CONFIG.WEBHOOK_ERROR_LOGGING,
});