export default class AlreadyExistsError extends Error {
  constructor(message?: string) {
    super(message ?? 'Already exists');
    this.name = 'AlreadyExistsError';
  }
}
