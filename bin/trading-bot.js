#!/usr/bin/node

import { env } from "../env.js";
import { Bot } from "../src/bot.js";
import log4js from "log4js";

log4js.configure({
    appenders: {
        console: { type: "console" },
        everything: {
            type: "file",
            filename: "logs/application.log",
            maxLogSize: 10485760,
            backups: 3,
            compress: true,
        },
    },
    categories: {
        default: { appenders: ["console", "everything"], level: "debug" },
    },
});

const bot = new Bot(env);

bot.start();
