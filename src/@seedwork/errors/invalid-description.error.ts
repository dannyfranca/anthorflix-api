export default class InvalidDescriptionError extends Error {
  constructor(message?: string) {
    super(message ?? 'the description is invalid');
    this.name = 'InvalidDescriptionError';
  }
}
