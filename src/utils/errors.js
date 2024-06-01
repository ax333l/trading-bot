export class RequestError extends Error {
  constructor(message) {
    super(message);
    this.name = "RequestError";
    this.message = message;
    this.stack = new Error().stack;
  }
}
