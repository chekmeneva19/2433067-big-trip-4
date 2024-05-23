import { render, replace } from '../framework/render.js';
import TripEventsView from '../view/trip-events-view.js';
import SortView from '../view/sort-view.js';
import EventEditView from '../view/event-edit-view.js';
import EventView from '../view/event-view.js';

export default class TripPresenter {
  #tripEventsComponent = new TripEventsView();
  #container = null;
  #destinationsModel = null;
  #offersModel = null;
  #eventsModel = null;
  #tripEvents = null;

  constructor({container, destinationsModel, offersModel, eventsModel}) {
    this.#container = container;
    this.#destinationsModel = destinationsModel;
    this.#offersModel = offersModel;
    this.#eventsModel = eventsModel;
  }

  init() {
    this.#tripEvents = [...this.#eventsModel.get()];

    render(new SortView(), this.#container);
    render(this.#tripEventsComponent, this.#container);

    for (let i = 0; i < this.#tripEvents.length; i++) {
      this.#renderEvent(this.#tripEvents[i]);
    }
  }

  #renderEvent(event) {
    const escKeyDownHandler = (evt) => {
      if (evt.key === 'Escape') {
        evt.preventDefault();
        replaceEditorToEvent();
        document.removeEventListener('keydown', escKeyDownHandler);
      }
    };

    const eventComponent = new EventView({
      event,
      eventDestination: this.#destinationsModel.getById(event.destination),
      eventOffers: this.#offersModel.getByType(event.type),
      onRollupClick: () => {
        replaceEventToEditor();
        document.addEventListener('keydown', escKeyDownHandler);
      }
    });

    const eventEditComponent = new EventEditView({
      event,
      eventDestination: this.#destinationsModel.getById(event.destination),
      eventOffers: this.#offersModel.getByType(event.type),
      onEditSubmit: () => {
        replaceEditorToEvent();
        document.removeEventListener('keydown', escKeyDownHandler);
      },
      onResetClick: () => {
        replaceEditorToEvent();
        document.removeEventListener('keydown', escKeyDownHandler);
      }
    });

    function replaceEventToEditor() {
      replace(eventEditComponent, eventComponent);
    }

    function replaceEditorToEvent() {
      replace(eventComponent, eventEditComponent);
    }

    render(eventComponent, this.#tripEventsComponent.element);
  }
}
