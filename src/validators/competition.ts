import { string, z } from 'zod';

const competitionCreateSchema = z.object({
  name: z.string().min(3),
  image: z.string().url(),
});

export type competitionCreateSchemaType = z.infer<
  typeof competitionCreateSchema
>;
