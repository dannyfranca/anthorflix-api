export default class InvalidNameError extends Error {
  constructor(message?: string) {
    super(message ?? 'the name is invalid');
    this.name = 'InvalidNameError';
  }
}
