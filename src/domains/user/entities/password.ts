import { genSaltSync, hashSync } from 'bcrypt';
import { isString } from 'lodash';

import InvalidPasswordError from '../errors/invalid-password.error';

export default class Password {
  private _pass: string | undefined;
  private _salt: string | undefined;
  private _hash: string | undefined;

  constructor(input: string | { pass?: string; salt?: string; hash?: string }) {
    if (isString(input)) this._pass = input;
    else {
      if (input.pass) this._pass = input.pass;
      if (input.salt) this._salt = input.salt;
      if (input.hash) this._hash = input.hash;
    }
    if (this._pass) this.validate();
  }

  get hash() {
    if (this._hash) return this._hash;
    if (!this._pass) throw this.error();
    if (!this._salt) this._salt = genSaltSync();
    this._hash = hashSync(this._pass, this._salt);
    return this._hash;
  }

  get salt() {
    if (!this._salt) this._salt = genSaltSync();
    return this._salt;
  }

  changePassword(pass: string) {
    this._pass = pass;
    this._salt = undefined;
    this._hash = undefined;
    this.validate();
  }

  private error() {
    return new InvalidPasswordError(
      'Password must have between 8 and 20 characters, , at least one uppercase letter, one lowercase letter, one number and one special character',
    );
  }

  private validate() {
    if (
      !this._pass ||
      !/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,20}$/g.test(
        this._pass,
      )
    )
      throw this.error();
  }
}
