import Password from './password';
import { PlainUser, User, UserProperties, UserPropertiesInput } from './user';

export interface AuthUserProperties extends UserProperties {
  password: Password;
}

export interface AuthUserPropertiesInput
  extends UserPropertiesInput,
    Pick<AuthUserProperties, 'password'> {}

export type PlainAuthUser = PlainUser;

export class AuthUser extends User {
  private _password: Password;

  constructor(props: AuthUserPropertiesInput) {
    super(props);
    this._password = props.password;
  }

  get plain(): PlainAuthUser {
    return super.plain;
  }

  get password() {
    return this._password;
  }
}
