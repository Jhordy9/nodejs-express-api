import { faker } from '@faker-js/faker';
import { db } from '.';

async function seed() {
  await db.competition.create({
    data: {
      name: faker.company.name(),
      image: faker.image.url(),
    },
  });

  await db.competition.create({
    data: {
      name: faker.company.name(),
      image: faker.image.url(),
    },
  });

  for (let i = 1; i <= 10; i++) {
    const team = await db.team.create({
      data: {
        name: faker.company.name(),
        location: faker.location.street(),
        stadium: faker.location.city(),
      },
    });

    for (let j = 1; j <= 11; j++) {
      await db.player.create({
        data: {
          name: faker.person.fullName(),
          age: faker.number.int({ min: 18, max: 40 }),
          nationality: faker.location.country(),
          image: faker.image.avatar(),
          teamId: team.id,
        },
      });
    }
  }
}

seed()
  .then(async () => {
    await db.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await db.$disconnect();
    process.exit(1);
  });
