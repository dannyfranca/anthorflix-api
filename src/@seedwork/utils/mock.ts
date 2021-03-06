import { Chance } from 'chance';

const chance = new Chance();

export const randomInt = (opt?: { min: number; max: number }) =>
  chance.integer(opt);
export const randomUsername = () =>
  chance
    .sentence({ words: 2, punctuation: false })
    .split(' ')
    .filter(Boolean)
    .join('_');
export const randomName = () => chance.sentence({ words: 2 });
export const randomDesc = (words = 10) => chance.sentence({ words });
export const randomYear = () => chance.integer({ min: 1960, max: 2020 });
export const randomPassword = () =>
  chance.string({ pool: 'abcde', length: 3 }) +
  chance.string({ pool: 'ABCDE', length: 3 }) +
  chance.string({ pool: '12345', length: 3 }) +
  chance.string({ pool: '$&', length: 3 });
export const randomDate = () =>
  chance.date({
    min: new Date(1960),
    max: new Date(2018),
    string: false,
  }) as Date;
