import Password from './password';
import { PlainUser, User, UserProperties, UserPropertiesInput } from './user';

export interface AuthUserProperties extends UserProperties {
  password: Password;
}

export interface AuthUserPropertiesInput
  extends UserPropertiesInput,
    Pick<AuthUserProperties, 'password'> {}

export interface PlainAuthUser extends PlainUser {
  password: {
    hash: string;
    salt: string;
  };
}

export class AuthUser extends User {
  private _password: Password;

  constructor(props: AuthUserPropertiesInput) {
    super(props);
    this._password = props.password;
  }

  get plain(): PlainAuthUser {
    return {
      ...super.plain,
      password: {
        hash: this.password.hash,
        salt: this.password.salt,
      },
    };
  }

  get password() {
    return this._password;
  }
}
