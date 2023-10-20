import type { Boom } from '@hapi/boom';
import { badRequest, badImplementation } from '@hapi/boom';
import type { RequestHandler } from 'express';
import type { z } from 'zod';
import { ZodError } from 'zod';

export type Validation<Params, Response, Body, Query> = {
  body?: z.ZodSchema<Body>;
  params?: z.ZodSchema<Params>;
  query?: z.ZodSchema<Query>;
  response?: z.ZodSchema<Response>;
};

export type ValidatedHandler<V> = V extends Validation<
  infer Params,
  infer Response,
  infer Body,
  infer Query
>
  ? RequestHandler<Params, Response, Body, Query>
  : never;

export type RequestError = {
  message: string;
};

export type MaybeBoom<T> = Boom | T;

export const validate = <
  Params = unknown,
  Response = unknown,
  Body = unknown,
  Query = unknown
>(
  validation: Validation<Params, MaybeBoom<Response>, Body, Query>
): ValidatedHandler<typeof validation> =>
  function (req, res, next) {
    try {
      if (validation.body) {
        validation.body.parse(req.body);
      }

      if (validation.query) {
        validation.query.parse(req.query);
      }

      if (validation.params) {
        validation.params.parse(req.params);
      }

      next();
    } catch (error) {
      if (error instanceof ZodError) {
        throw badRequest(error.message);
      }
      next(error);
    }
  };

export type ValidatedResponseOpts<T> = {
  data: unknown;
  schema: z.ZodSchema<T>;
};

export function validateResponse<T>(opts: ValidatedResponseOpts<T>) {
  try {
    const { data, schema } = opts;

    return schema.parse(data);
  } catch (error) {
    if (error instanceof ZodError) {
      throw badImplementation('Zod did not parse correctly', {
        rawError: error,
      });
    }

    throw badImplementation('Method: ValidatedResponse could not return');
  }
}
