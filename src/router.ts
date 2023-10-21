import { Router } from 'express';
import { validate, validateResponse } from './middlewares';
import {
  EventCreateBodySchema,
  EventFilterQuerySchema,
  EventUpdateBodySchema,
  EventsSchema,
} from './validators/events';
import { getEvents } from './services/getEvents';
import { Status } from '@prisma/client';
import { StatusCodes, ReasonPhrases } from 'http-status-codes';
import { createEvent } from './services/createEvent';
import { updateEvent } from './services/updateEvent';
import { isBoom } from '@hapi/boom';

export const router = Router();

router.get(
  '/events',
  validate({
    query: EventFilterQuerySchema,
    response: EventsSchema,
  }),
  async (req, res) => {
    try {
      const events = validateResponse({
        data: await getEvents({
          status: req.query.status ?? Status.LIVE,
          date: req.query.date,
        }),
        schema: EventsSchema,
      });

      return res.json(events).status(200);
    } catch (e) {
      if (isBoom(e)) {
        console.error(e);
        throw e;
      }

      console.error(e);
      throw e;
    }
  }
);

router.post(
  '/events',
  validate({
    body: EventCreateBodySchema,
  }),
  async (req, res) => {
    try {
      await createEvent(req.body);

      return res.status(StatusCodes.CREATED).send(ReasonPhrases.CREATED);
    } catch (e) {
      if (isBoom(e)) {
        console.error(e);
        throw e;
      }

      console.error(e);
      throw e;
    }
  }
);

router.put(
  '/events',
  validate({
    body: EventUpdateBodySchema,
  }),
  async (req, res) => {
    try {
      await updateEvent(req.body);

      return res.status(StatusCodes.OK).send(ReasonPhrases.OK);
    } catch (e) {
      if (isBoom(e)) {
        console.error(e);
        throw e;
      }

      console.error(e);
      throw e;
    }
  }
);
