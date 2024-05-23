import FilterView from './view/filter-view.js';
import TripInfoView from './view/trip-info-view.js';
import { render, RenderPosition } from './framework/render.js';
import TripPresenter from './presenter/trip-presenter.js';
import MockService from './service/mock-service.js';
import DestinationsModel from './model/destinations-model.js';
import OffersModel from './model/offers-model.js';
import EventsModel from './model/events-model.js';

const tripMainContainer = document.querySelector('.trip-main');
const filterContainer = document.querySelector('.trip-controls__filters');
const tripEventsContainer = document.querySelector('.trip-events');
const mockService = new MockService();
const destinationsModel = new DestinationsModel(mockService);
const offersModel = new OffersModel(mockService);
const eventsModel = new EventsModel(mockService);

const routePresenter = new TripPresenter({
  container: tripEventsContainer,
  destinationsModel,
  offersModel,
  eventsModel
});

render(new TripInfoView(), tripMainContainer, RenderPosition.AFTERBEGIN);
render(new FilterView(), filterContainer);

routePresenter.init();
