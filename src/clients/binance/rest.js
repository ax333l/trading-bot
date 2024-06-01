import crypto from "node:crypto";
import { buildQueryString, removeEmptyValue } from "../../utils/qs.js";
import { RequestError } from "../../utils/errors.js";
import log4js from "log4js";

export class BinanceRestClient {
    logger = log4js.getLogger("BinanceRestClient");

    constructor(api_key, api_secret, base_url) {
        this.API_KEY = api_key;
        this.API_SECRET = api_secret;
        this.BASE_URL = base_url;
    }

    async publicRequest(method, path, params = {}) {
        params = removeEmptyValue(params);
        const queryString = buildQueryString(params);
        const response = await fetch(`${this.BASE_URL}${path}?${queryString}`, {
            method,
        });

        const json = await response.json();
        if (json.hasOwnProperty("code") && json.code !== 200) {
            throw new RequestError(json.msg);
        }

        return json;
    }

    async request(method, path, params = {}) {
        params = removeEmptyValue(params);
        const timestamp = Date.now();
        const queryString = buildQueryString({ ...params, timestamp });

        const signature = crypto
            .createHmac("sha256", this.API_SECRET)
            .update(queryString)
            .digest("hex");

        const response = await fetch(
            `${this.BASE_URL}${path}?${queryString}&signature=${signature}`,
            {
                method,
                headers: {
                    "Content-Type": "application/json",
                    "X-MBX-APIKEY": this.API_KEY,
                },
            }
        );

        const json = await response.json();
        if (json.hasOwnProperty("code") && json.code !== 200) {
            throw new RequestError(json.msg);
        }

        return json;
    }
}
