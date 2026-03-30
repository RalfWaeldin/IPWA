import { hash } from "bcrypt";
import jwt from "jsonwebtoken";
import { ACCESS_JWT_SECRET, SALT_ROUNDS } from "#config";
import { Types } from "mongoose";

export async function hashPassword(password: string) {
  return await hash(password, Number.parseInt(SALT_ROUNDS));
}

export function createAccessToken(payload: {
  id: Types.ObjectId;
  role: string;
}) {
  return jwt.sign({ sub: payload.id, roles: payload.role }, ACCESS_JWT_SECRET, {
    expiresIn: "30min",
  });
}
