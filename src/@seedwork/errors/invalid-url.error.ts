export default class InvalidUrlError extends Error {
  constructor(message?: string) {
    super(message ?? 'the url is invalid');
    this.name = 'InvalidUrlError';
  }
}
