import InvalidUsernameError from '../errors/invalid-username.error';

export default class Username {
  constructor(public readonly value: string) {
    this.validate();
  }

  private validate() {
    if (!/^[A-Za-z][A-Za-z0-9_]{4,29}$/g.test(this.value))
      throw new InvalidUsernameError();
  }
}
