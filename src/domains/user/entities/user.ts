import {
  Entity,
  EntityProperties,
  EntityPropertiesInput,
  PlainEntity,
} from '@/@seedwork/entities/entity';

export interface UserProperties extends EntityProperties {
  username: string;
}

export interface UserPropertiesInput
  extends EntityPropertiesInput,
    Pick<UserProperties, 'username'> {}

export interface PlainUser extends PlainEntity {
  username: string;
}

export class User extends Entity {
  private _username: string;

  constructor(props: UserPropertiesInput) {
    super(props);
    this._username = props.username;
  }

  get plain(): PlainUser {
    return {
      ...super.plain,
      username: this.username,
    };
  }

  get username() {
    return this._username;
  }
}
