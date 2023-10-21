import request from 'supertest';
import { StatusCodes, ReasonPhrases } from 'http-status-codes';
import { app } from '../main';
import { Competition, Player, Status, Team } from '@prisma/client';
import { db } from '../../prisma';
import { EventUpdateBodySchemaType } from '../validators/events';
import { execSync } from 'child_process';

let teams: Array<Team> = [];
let competition: Competition | null;
let players: Array<Player> = [];
let eventId: string;

beforeAll(async () => {
  await db.score.deleteMany();
  await db.event.deleteMany();
  await db.competition.deleteMany();
  await db.team.deleteMany();
  await db.player.deleteMany();

  execSync('yarn db:seed');

  teams = await db.team.findMany({ take: 2 });
  competition = await db.competition.findFirst();
  players = await db.player.findMany({ take: 2 });
});

describe('Events Routes', () => {
  describe('POST /events', () => {
    it('should create a new event', async () => {
      const newEventData = [
        {
          startTime: '2023-10-21T18:38:09.266Z',
          status: Status.NOT_STARTED,
          homeTeamId: teams[0].id,
          visitorTeamId: teams[1].id,
          competitionId: competition?.id,
        },
        {
          startTime: '2023-08-21T18:38:09.266Z',
          status: Status.LIVE,
          homeTeamId: teams[0].id,
          visitorTeamId: teams[1].id,
          competitionId: competition?.id,
        },
      ];

      const responses = await Promise.all(
        newEventData.map(async (event) =>
          request(app).post('/api/events').send(event)
        )
      );

      expect(responses[0].status).toBe(StatusCodes.CREATED);
      expect(responses[1].status).toBe(StatusCodes.CREATED);
    });
  });

  describe('GET /events', () => {
    it('should fetch events with default status', async () => {
      const response = await request(app).get('/api/events');

      eventId = response.body[0].id;

      expect(response.status).toBe(200);
      expect(response.body.length).toBe(1);
    });

    it('should fetch events with specific status', async () => {
      const status = Status.NOT_STARTED;
      const response = await request(app).get(`/api/events?status=${status}`);

      expect(response.status).toBe(200);
      expect(response.body.length).toBe(1);
    });

    it('should fetch events from a date', async () => {
      const date = '2023-08-21T18:38:09.266Z';
      const response = await request(app).get(`/api/events?date=${date}`);

      expect(response.status).toBe(200);
      expect(response.body.length).toBe(1);
    });
  });

  describe('PUT /events', () => {
    it('should update an existing event', async () => {
      console.log('eventId', eventId);
      const updateData: EventUpdateBodySchemaType = {
        eventId,
        score: {
          playerId: players[0].id,
          teamId: teams[0].id,
        },
      };

      const response = await request(app).put('/api/events').send(updateData);

      expect(response.status).toBe(StatusCodes.OK);
      expect(response.text).toBe(ReasonPhrases.OK);
    });
  });
});
