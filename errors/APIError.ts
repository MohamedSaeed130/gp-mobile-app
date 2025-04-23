export default class APIError extends Error {
  constructor(readonly errRes: { message: string; details?: string }) {
    super(errRes.message);
  }
}
