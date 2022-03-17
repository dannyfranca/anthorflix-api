import InvalidUrlError from '../errors/invalid-url.error';
import Url from './url';

describe('URL tests', () => {
  it('should accept URLs', () => {
    expect(new Url('http://domain.com.br').value).toBe('http://domain.com.br');
    expect(new Url('www.domain.com.br').value).toBe('www.domain.com.br');
  });

  it('should throw InvalidUsernameError error', () => {
    expect(() => new Url('url')).toThrowError(InvalidUrlError);
    expect(() => new Url('url.c')).toThrowError(InvalidUrlError);
  });
});
