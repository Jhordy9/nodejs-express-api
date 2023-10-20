import { db } from '../../prisma';
import {
  EventFilterParamsSchemaType,
  EventSchemaType,
} from '../validators/events';

export const getEvents = async (
  args: EventFilterParamsSchemaType
): Promise<Array<EventSchemaType>> => {
  const events = await db.event.findMany({
    where: {
      status: args.status,
      startTime: {
        gte: args.date,
      },
    },
    include: {
      competition: true,
      homeTeam: true,
      visitorTeam: true,
    },
    orderBy: {
      startTime: 'asc',
    },
  });

  const eventsWithScores = await Promise.all(
    events.map(async (event) => {
      const homeTeamScore = await db.score.count({
        where: {
          eventId: event.id,
          teamId: event.homeTeamId,
        },
      });

      const visitorTeamScore = await db.score.count({
        where: {
          eventId: event.id,
          teamId: event.visitorTeamId,
        },
      });

      return {
        ...event,
        homeTeamScore,
        visitorTeamScore,
      };
    })
  );

  return eventsWithScores;
};
