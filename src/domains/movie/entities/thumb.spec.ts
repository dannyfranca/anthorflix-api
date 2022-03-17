import Url from '@/@seedwork/entities/url';
import InvalidUrlError from '@/@seedwork/errors/invalid-url.error';
import { Thumb } from './thumb';

describe('Thumb tests', () => {
  it('should accept URL thumb', () => {
    const url = new Url('http://domain.com.br');
    const thumb = new Thumb({ url });
    expect(thumb.url.value).toBe('http://domain.com.br');
  });

  it('should throw InvalidUrlError error', () => {
    expect(() => new Thumb({ url: new Url('url') })).toThrowError(
      InvalidUrlError,
    );
  });
});
