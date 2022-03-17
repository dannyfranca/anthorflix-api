import { isURL } from 'class-validator';
import InvalidUrlError from '../errors/invalid-url.error';

export default class Url {
  private _value: string;

  constructor(value: string) {
    this.change(value);
  }

  get value() {
    return this._value;
  }

  change(value: string) {
    this._value = value;
    this.validate();
  }

  private validate() {
    if (!isURL(this.value)) throw new InvalidUrlError();
  }
}
