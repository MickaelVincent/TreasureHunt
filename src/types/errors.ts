export class OutOfBoundsError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "OutOfBoundsError";
  }
}
