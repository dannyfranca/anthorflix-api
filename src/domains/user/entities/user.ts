import {
  Entity,
  EntityProperties,
  EntityPropertiesInput,
  PlainEntity,
} from '@/@seedwork/entities/entity';
import Username from '@/@seedwork/entities/username';

export interface UserProperties extends EntityProperties {
  username: Username;
}

export interface UserPropertiesInput
  extends EntityPropertiesInput,
    Pick<UserProperties, 'username'> {}

export interface PlainUser extends PlainEntity {
  username: string;
}

export class User extends Entity {
  private _username: Username;

  constructor(props: UserPropertiesInput) {
    super(props);
    this._username = props.username;
  }

  get plain(): PlainUser {
    return {
      ...super.plain,
      username: this.username.value,
    };
  }

  get username() {
    return this._username;
  }
}
