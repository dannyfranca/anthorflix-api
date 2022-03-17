import { PlainUser, User } from '@/domains/user/entities/user';
import {
  Entity,
  EntityProperties,
  EntityPropertiesInput,
  PlainEntity,
} from '@/@seedwork/entities/entity';
import UniqueEntityId from '@/@seedwork/entities/unique-entity-id';
import RequiredDescription from '@/@seedwork/entities/required-description';

export interface CommentProperties extends EntityProperties {
  content: RequiredDescription;
  user: User;
  rating_id: UniqueEntityId;
}

export interface CommentPropertiesInput
  extends EntityPropertiesInput,
    Pick<CommentProperties, 'content' | 'user' | 'rating_id'> {}

export interface PlainComment extends PlainEntity {
  content: string;
  rating_id: string;
  user_id: string;
  user: PlainUser;
}

export class Comment extends Entity {
  private _content: RequiredDescription;
  private _rating_id: UniqueEntityId;
  private _user: User;

  constructor(props: CommentPropertiesInput) {
    super(props);
    this._content = props.content;
    this._rating_id = props.rating_id;
    this._user = props.user;
  }

  get plain(): PlainComment {
    return {
      ...super.plain,
      content: this.content.value,
      rating_id: this.rating_id.value,
      user_id: this.user.id.value,
      user: this.user.plain,
    };
  }

  get content() {
    return this._content;
  }

  get rating_id() {
    return this._rating_id;
  }

  get user() {
    return this._user;
  }
}
