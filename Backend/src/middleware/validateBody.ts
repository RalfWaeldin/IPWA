import { writeLogFileEntry } from "#utils";
import type { RequestHandler } from "express";
import type { ZodObject } from "zod/v4";
import { z } from "zod/v4";

const validateBody =
  (zodSchema: ZodObject): RequestHandler =>
  (req, _res, next) => {
    writeLogFileEntry(
      "Enter validate Body",
      _res,
      2,
      "middleware/validateBody",
    );
    const { data, error, success } = zodSchema.safeParse(req.body);
    if (!success) {
      next(
        new Error(z.prettifyError(error), {
          cause: {
            status: 400,
          },
        }),
      );
    } else {
      writeLogFileEntry(
        "Request Body validated",
        _res,
        2,
        "middleware/validateBody",
      );
      req.body = data;
      next();
    }
  };

export default validateBody;
