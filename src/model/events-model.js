export default class EventsModel {
  #service = null;
  #events = null;

  constructor(service) {
    this.#service = service;
    this.#events = this.#service.events;
  }

  get() {
    return this.#events;
  }
}
