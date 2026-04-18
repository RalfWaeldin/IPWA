import {
  userSchema,
  postSchema,
  signInSchema,
  loginSchema,
  keyValuePairSchema,
} from "#schemas";
import { z } from "zod/v4";

declare global {
  type UserRequestBody = z.infer<typeof userSchema>;
  type PostRequestBody = z.infer<typeof postSchema>;
  type SignInRequestBody = z.infer<typeof signInSchema>;
  type LoginRequestBody = z.infer<typeof loginSchema>;

  type SanitizedBody =
    | UserRequestBody
    | PostRequestBody
    | SignInRequestBody
    | LoginRequestBody;

  type KeyValuePair = z.infer<typeof keyValuePairSchema>;
}

export {};
