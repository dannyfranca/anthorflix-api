export default class InvalidPasswordError extends Error {
  constructor(message?: string) {
    super(message ?? 'the password is invalid');
    this.name = 'InvalidPasswordError';
  }
}
