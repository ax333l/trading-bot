import { BinanceRestClient } from "./rest.js";

export class BinanceClient {
    constructor(api_key, api_secret, base_url) {
        this.rest = new BinanceRestClient(api_key, api_secret, base_url);
        this.API_KEY = api_key;
        this.API_SECRET = api_secret;
        this.BASE_URL = base_url;
    }

    status() {
        return this.rest.publicRequest("GET", "/sapi/v1/system/status");
    }
}
