import "dotenv/config.js";
import { cleanEnv, url, str } from "envalid";

export const env = cleanEnv(process.env, {
    BINANCE_URL: url({ default: "https://api.binance.com" }),
    BINANCE_API_KEY: str({ required: true }),
    BINANCE_SECRET_KEY: str({ required: true }),
});
