import Url from '@/@seedwork/entities/url';

export interface ThumbProperties {
  url: Url;
}

export type ThumbPropertiesInput = Pick<ThumbProperties, 'url'>;

export class Thumb {
  private _url: Url;

  constructor(props: ThumbPropertiesInput) {
    this._url = props.url;
  }

  get url() {
    return this._url;
  }

  async validateContent() {
    // TODO: download image, check MIME type and dimensions. Must return Buffer
  }
}
