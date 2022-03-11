export default class InvalidRatingError extends Error {
  constructor(message?: string) {
    super(message ?? 'Rating value must be between 0 and 10');
    this.name = 'InvalidRatingError';
  }
}
