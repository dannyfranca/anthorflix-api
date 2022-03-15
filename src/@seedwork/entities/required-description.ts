import InvalidDescriptionError from '../errors/invalid-description.error';

export default class RequiredDescription {
  private _value: string;

  constructor(value: string) {
    this.changeDescription(value);
  }

  get value() {
    return this._value;
  }

  changeDescription(value: string) {
    this._value = value;
    this.validate();
  }

  private validate() {
    const length = this.value.trim().length;
    if (length < 2 || length > 10000) throw new InvalidDescriptionError();
  }
}
