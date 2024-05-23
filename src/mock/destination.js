import { getRandomArrayElement, getRandomInteger } from '../utils.js';
import { DESCRIPTION, CITIES, DESTINATION_COUNT } from '../const.js';

function generateDestination() {
  return {
    id: crypto.randomUUID(),
    description: Array.from({length: getRandomInteger(1, 5)}, () => getRandomArrayElement(DESCRIPTION)).join(' '),
    name: getRandomArrayElement(CITIES),
    pictures: Array.from({length: getRandomInteger(1, 5)}, () => ({
      src: `https://loremflickr.com/248/152?random=${crypto.randomUUID()}`,
      description: getRandomArrayElement(DESCRIPTION)
    }))
  };
}

const mockDestinations = Array.from({length: DESTINATION_COUNT}, generateDestination);

export {mockDestinations};
