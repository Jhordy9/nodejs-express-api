import { eventsRepository } from '../repositories/events';
import { EventCreateBodySchemaType } from '../validators/events';

export const createEvent = (event: EventCreateBodySchemaType) =>
  eventsRepository.createEvent(event);
