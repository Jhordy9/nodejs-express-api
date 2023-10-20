import { eventsRepository } from '../repositories/events';
import {
  EventFilterParamsSchemaType,
  EventSchemaType,
} from '../validators/events';

export const getEvents = async (
  args: EventFilterParamsSchemaType
): Promise<Array<EventSchemaType>> => {
  const events = await eventsRepository.getEvents(args);

  return events;
};
