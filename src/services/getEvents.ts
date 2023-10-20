import { eventsRepository } from '../repositories/events';
import {
  EventFilterQuerySchemaType,
  EventSchemaType,
} from '../validators/events';

export const getEvents = async (
  args: EventFilterQuerySchemaType
): Promise<Array<EventSchemaType>> => {
  const events = await eventsRepository.getEvents(args);

  return events;
};
