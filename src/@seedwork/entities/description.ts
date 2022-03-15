import { isNull } from 'lodash';
import InvalidDescriptionError from '../errors/invalid-description.error';

export default class Description {
  private _value: string | null;

  constructor(value: string | null) {
    this.changeDescription(value);
  }

  get value() {
    return this._value;
  }

  changeDescription(value: string | null) {
    this._value = value;
    this.validate();
  }

  private validate() {
    if (isNull(this.value)) return;
    const length = this.value.trim().length;
    if (length < 2 || length > 10000) throw new InvalidDescriptionError();
  }
}
