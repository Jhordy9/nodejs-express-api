import { eventsRepository } from '../repositories/events';
import { EventUpdateBodySchemaType } from '../validators/events';

export const updateEvent = async (event: EventUpdateBodySchemaType) =>
  eventsRepository.updateEvent(event);
