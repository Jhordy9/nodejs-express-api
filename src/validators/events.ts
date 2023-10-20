import { Status } from '@prisma/client';
import { z } from 'zod';

const StatusEnum = z.nativeEnum(Status);

const TeamSchema = z.lazy(() =>
  z.object({
    id: z.string(),
    name: z.string(),
    location: z.string(),
    stadium: z.string(),
    players: z.array(PlayerSchema),
    homeEvent: z.array(EventSchema),
    visitorEvent: z.array(EventSchema),
  })
);
const CompetitionSchema = z.object({
  id: z.string(),
  createdAt: z.date(),
  name: z.string(),
  image: z.string(),
});

export const EventSchema = z.object({
  id: z.string(),
  startTime: z.date(),
  status: StatusEnum,
  homeTeam: TeamSchema,
  visitorTeam: TeamSchema,
  homeTeamScore: z.number(),
  visitorTeamScore: z.number(),
  competition: CompetitionSchema,
});

const PlayerSchema = z.object({
  id: z.string(),
  name: z.string(),
  age: z.number(),
  nationality: z.string(),
  image: z.string(),
  team: TeamSchema.optional(),
  teamId: z.string().optional(),
});

export const EventFilterQuerySchema = z.object({
  status: StatusEnum.optional(),
  date: z.date().optional(),
});

export const EventsSchema = z.array(EventSchema);

export type EventSchemaType = z.infer<typeof EventSchema>;
export type EventFilterQuerySchemaType = z.infer<typeof EventFilterQuerySchema>;
