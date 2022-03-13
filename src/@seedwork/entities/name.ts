import InvalidNameError from '../errors/invalid-name.error';

export default class Name {
  private _value: string;

  constructor(value: string) {
    this.changeName(value);
  }

  get value() {
    return this._value;
  }

  changeName(value: string) {
    this._value = value;
    this.validate();
  }

  private validate() {
    const length = this.value.trim().length;
    if (length < 2 || length > 255) throw new InvalidNameError();
  }
}
