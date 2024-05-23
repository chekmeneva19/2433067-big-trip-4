import { getRandomArrayElement, getRandomInteger } from '../utils.js';
import { TYPES, TITLES, Price } from '../const.js';

const mockOffers = [];

function generateOffer(type) {
  return {
    type,
    offers: Array.from({length: getRandomInteger(0, 5)}, () => ({
      id: crypto.randomUUID(),
      title: getRandomArrayElement(TITLES),
      price:getRandomInteger(Price.MIN, Price.MAX)
    }))
  };
}

TYPES.forEach((type) => {
  const offer = generateOffer(type);
  mockOffers.push(offer);
});

export {mockOffers};

