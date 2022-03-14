import { Chance } from 'chance';

const chance = new Chance();

export const randomName = () => chance.sentence({ words: 2 });
export const randomDesc = () => chance.sentence({ words: 10 });
export const randomYear = () => chance.integer({ min: 1960, max: 2020 });
export const randomDate = () =>
  chance.date({
    min: new Date(1960),
    max: new Date(2018),
    string: false,
  }) as Date;
