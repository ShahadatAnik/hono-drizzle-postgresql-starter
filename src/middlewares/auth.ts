import type { IPayload } from "@/routes/hr/users/utils";
import type { Context } from "hono";
import env from "@/env";
import { compareSync, genSaltSync, hashSync } from "bcrypt-ts";
import jwt from "jsonwebtoken";

const { sign, verify } = jwt;

export function HashPass(hash: string) {
  const salt = genSaltSync(env.SALT);
  return hashSync(hash, salt);
}

export async function ComparePass(password: string, HashPass: string) {
  return compareSync(password, HashPass);
}

export async function CreateToken(payload: IPayload) {
  return sign(payload, env.PRIVATE_KEY);
}

export async function VerifyToken(token: string, c: Context) {
  const { url, method } = c.env.outgoing.req;

  if (url === "/v1/signin" && method === "POST")
    return true;

  verify(token, env.PRIVATE_KEY, (err: any, user: any) => {
    if (err)
      return false;

    c.env.outgoing.req.user = user;

    return true;
  });

  return false;
}
