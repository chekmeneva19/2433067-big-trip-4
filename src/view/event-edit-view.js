import AbstractView from '../framework/view/abstract-view.js';
import { TYPES, CITIES, POINT_EMPTY } from '../const.js';
import { formatStringToDateTime, firstLetterToUpperCase, firstLetterToLowerCase } from '../utils.js';

function createEventTypesListElement(currentType) {
  return TYPES.map((type) =>
    `<div class="event__type-item">
      <input id="event-type-${type}-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="${type}" ${currentType === type ? 'checked' : ''}>
      <label class="event__type-label  event__type-label--${type}" for="event-type-${type}-1">${firstLetterToUpperCase(type)}</label>
    </div>`).join('');
}

function createEventDestinationListElement() {
  return `
    <datalist id="destination-list-1">
      ${CITIES.map((city) => `<option value="${city}"></option>`).join('')}
    </datalist>`;
}

function createEventOfferElement(offers, checkedOffers) {
  const offerItem = offers.map((offer) => `
    <div class="event__offer-selector">
      <input class="event__offer-checkbox  visually-hidden" id="${offer.id}" type="checkbox" name="event-offer-${firstLetterToLowerCase(offer.title)}" ${checkedOffers.includes(offer.id) ? 'checked' : ''}>
      <label class="event__offer-label" for="${offer.id}">
        <span class="event__offer-title">${offer.title}</span>
        &plus;&euro;&nbsp;
        <span class="event__offer-price">${offer.price}</span>
      </label>
    </div>`).join('');
  return `<div class="event__available-offers">${offerItem}</div>`;
}

function createEventPhotoElement(pictures) {
  return `
    <div class="event__photos-container">
      <div class="event__photos-tape">
        ${pictures.map((picture) => `<img class="event__photo" src="${picture.src}" alt="${picture.description}">`).join('')}
      </div>
    </div>`;
}

function createEventEditElement({event, eventDestination, eventOffers}) {
  const { type, offers, dateFrom, dateTo, price } = event;
  return `
    <li class="trip-events__item">
      <form class="event event--edit" action="#" method="post">
        <header class="event__header">
          <div class="event__type-wrapper">
            <label class="event__type  event__type-btn" for="event-type-toggle-1">
              <span class="visually-hidden">Choose event type</span>
              <img class="event__type-icon" width="17" height="17" src="img/icons/${type}.png" alt="Event type icon">
            </label>
            <input class="event__type-toggle  visually-hidden" id="event-type-toggle-1" type="checkbox">

            <div class="event__type-list">
              <fieldset class="event__type-group">
                <legend class="visually-hidden">Event type</legend>
                ${createEventTypesListElement(type)}
              </fieldset>
            </div>
          </div>

          <div class="event__field-group  event__field-group--destination">
            <label class="event__label  event__type-output" for="event-destination-1">
              ${type}
            </label>
            <input class="event__input  event__input--destination" id="event-destination-1" type="text" name="event-destination" value="${eventDestination.name}" list="destination-list-1">
            ${createEventDestinationListElement()}
          </div>

          <div class="event__field-group  event__field-group--time">
            <label class="visually-hidden" for="event-start-time-1">From</label>
            <input class="event__input  event__input--time" id="event-start-time-1" type="text" name="event-start-time" value="${formatStringToDateTime(dateFrom)}">
            &mdash;
            <label class="visually-hidden" for="event-end-time-1">To</label>
            <input class="event__input  event__input--time" id="event-end-time-1" type="text" name="event-end-time" value="${formatStringToDateTime(dateTo)}">
          </div>

          <div class="event__field-group  event__field-group--price">
            <label class="event__label" for="event-price-1">
              <span class="visually-hidden">Price</span>
              &euro;
            </label>
            <input class="event__input  event__input--price" id="event-price-1" type="text" name="event-price" value="${price}">
          </div>

          <button class="event__save-btn  btn  btn--blue" type="submit">Save</button>
          <button class="event__reset-btn" type="reset">Cancel</button>
        </header>
        <section class="event__details">
          <section class="event__section  event__section--offers">
            <h3 class="event__section-title  event__section-title--offers">Offers</h3>
            ${createEventOfferElement(eventOffers.offers, offers)}
          </section>

          <section class="event__section  event__section--destination">
            <h3 class="event__section-title  event__section-title--destination">Destination</h3>
            <p class="event__destination-description">${eventDestination.description}</p>

            ${createEventPhotoElement(eventDestination.pictures)}
          </section>
        </section>
      </form>
    </li>`;
}

export default class EventEditView extends AbstractView {
  #event = null;
  #eventDestination = null;
  #eventOffers = null;
  #handleEditSubmit = null;
  #handleResetClick = null;

  constructor({event = POINT_EMPTY, eventDestination, eventOffers, onEditSubmit, onResetClick}) {
    super();
    this.#event = event;
    this.#eventDestination = eventDestination;
    this.#eventOffers = eventOffers;
    this.#handleEditSubmit = onEditSubmit;
    this.#handleResetClick = onResetClick;

    this.element.querySelector('.event--edit')
      .addEventListener('submit', this.#editSubmitHandler);
    this.element.querySelector('.event__reset-btn')
      .addEventListener('click', this.#resetClickHandler);
  }

  get template() {
    return createEventEditElement({
      event: this.#event,
      eventDestination: this.#eventDestination,
      eventOffers: this.#eventOffers
    });
  }

  #editSubmitHandler = (evt) => {
    evt.preventDefault();
    this.#handleEditSubmit();
  };

  #resetClickHandler = (evt) => {
    evt.preventDefault();
    this.#handleResetClick();
  };
}
