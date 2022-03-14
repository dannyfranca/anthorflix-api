import { User } from '@/domains/user/entities/user';
import {
  Entity,
  EntityProperties,
  EntityPropertiesInput,
  PlainEntity,
} from '@/@seedwork/entities/entity';
import Description from '@/@seedwork/entities/description';

export interface CommentProperties extends EntityProperties {
  content: Description;
  user: User;
}

export interface CommentPropertiesInput
  extends EntityPropertiesInput,
    Pick<CommentProperties, 'content' | 'user'> {}

export interface PlainComment extends PlainEntity {
  content: string;
  user_id: string;
}

export class Comment extends Entity {
  private _content: Description;
  private _user: User;

  constructor(props: CommentPropertiesInput) {
    super(props);
    this._content = props.content;
    this._user = props.user;
  }

  get plain(): PlainComment {
    return {
      ...super.plain,
      content: this.content.value,
      user_id: this.user.id.value,
    };
  }

  get content() {
    return this._content;
  }

  get user() {
    return this._user;
  }
}
