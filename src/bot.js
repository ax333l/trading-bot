import { BinanceClient } from "./clients/binance/client.js";
import log4js from "log4js";

export class Bot {
    logger = log4js.getLogger("Bot");

    constructor(config) {
        this.binance = new BinanceClient(
            config.BINANCE_API_KEY,
            config.BINANCE_SECRET_KEY,
            config.BINANCE_URL
        );
    }

    async start() {
        const binanceStatus = await this.binance.status();
        this.logger.info("BINANCE STATUS", binanceStatus);
    }
}
