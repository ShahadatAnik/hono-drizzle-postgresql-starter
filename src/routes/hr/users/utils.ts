import { createInsertSchema, createSelectSchema } from "drizzle-zod";
import { z } from "zod";

import { users } from "../schema";

export interface IPayload {
  uuid: string;
  username: string;
  email: string;
  exp: number;
}

//* crud
export const selectSchema = createSelectSchema(users);

export const signinSchema = z.object({
  email: z.string().email(),
  pass: z.string().min(4).max(50),
});

export const signinOutputSchema = z.object({
  payload: z.object({
    uuid: z.string(),
    username: z.string(),
    email: z.string(),
    exp: z.number(),
  }) as z.Schema<IPayload>,
  token: z.string(),
});

export const insertSchema = createInsertSchema(
  users,
  {
    uuid: schema => schema.uuid.length(15),
    name: schema => schema.name.min(1),
    email: schema => schema.email.min(1),
    pass: schema => schema.pass.min(4).max(50),
  },
).required({
  uuid: true,
  name: true,
  email: true,
  pass: true,
  created_at: true,
}).omit({
  status: true,
  designation_uuid: true,
  department_uuid: true,
  can_access: true,
  ext: true,
  phone: true,
  updated_at: true,
  remarks: true,
});

export const patchSchema = insertSchema.partial();
