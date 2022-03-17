import InvalidUrlError from '../errors/invalid-url.error';
import Url from './url';

describe('URL tests', () => {
  it('should accept URLs', () => {
    expect(new Url('http://domain.com.br').value).toBe('http://domain.com.br');
    expect(new Url('www.domain.com.br').value).toBe('www.domain.com.br');
  });

  it('should accept URL change', () => {
    const url = new Url('http://domain.com.br');
    url.change('www.domain.com.br');
    expect(url.value).toBe('www.domain.com.br');
  });

  it('should throw InvalidUrlError error on URL change', () => {
    const url = new Url('http://domain.com.br');
    expect(() => url.change('url.c')).toThrowError(InvalidUrlError);
  });

  it('should throw InvalidUrlError error', () => {
    expect(() => new Url('url')).toThrowError(InvalidUrlError);
    expect(() => new Url('url.c')).toThrowError(InvalidUrlError);
  });
});
