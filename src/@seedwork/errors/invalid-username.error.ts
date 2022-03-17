export default class InvalidUsernameError extends Error {
  constructor(message?: string) {
    super(
      message ??
        'the username must only contain alfanumeric character between 5 and 30',
    );
    this.name = 'InvalidUsernameError';
  }
}
