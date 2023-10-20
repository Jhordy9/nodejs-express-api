import { Router } from 'express';
import { validate, validateResponse } from './middlewares';
import { EventFilterQuerySchema, EventsSchema } from './validators/events';
import { getEvents } from './services/getEvents';
import { Status } from '@prisma/client';

export const router = Router();

router.get(
  '/events',
  validate({
    query: EventFilterQuerySchema,
  }),
  async (req, res) => {
    const events = validateResponse({
      data: await getEvents({
        status: req.query.status ?? Status.LIVE,
        date: req.query.date,
      }),
      schema: EventsSchema,
    });

    res.json(events).status(200);
  }
);
