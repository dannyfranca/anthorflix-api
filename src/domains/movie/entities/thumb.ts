import {
  Entity,
  EntityProperties,
  EntityPropertiesInput,
  PlainEntity,
} from '@/@seedwork/entities/entity';
import Name from '@/@seedwork/entities/name';
import Description from '@/@seedwork/entities/description';
import Url from '@/@seedwork/entities/url';

export interface ThumbProperties extends EntityProperties {
  url: Url;
}

export interface ThumbPropertiesInput
  extends EntityPropertiesInput,
    Pick<ThumbProperties, 'url'> {}

export interface PlainThumb extends PlainEntity {
  url: string;
}

export class Thumb extends Entity {
  private _url: Url;

  constructor(props: ThumbPropertiesInput) {
    super(props);
    this._url = props.url;
  }

  get plain(): PlainThumb {
    return {
      ...super.plain,
      url: this.url.value,
    };
  }

  get url() {
    return this._url;
  }

  async validateContent() {
    // TODO: download image, check MIME type and dimensions. Must return Buffer
  }
}
