import type { RequestHandler, Response } from "express";
import { z } from "zod/v4";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { User } from "#models";
import { ACCESS_JWT_SECRET } from "#config";
import { createAccessToken, hashPassword } from "#utils";
import { registerSchema } from "#schemas";
import { writeLogFileEntry } from "#utils";

type UserDTO = z.infer<typeof registerSchema>;

function setAuthCookies(res: Response, accessToken: string) {
  writeLogFileEntry(
    `Try to set Access Token as Cookie: ${accessToken}`,
    res,
    2,
    "authenticationController/setAuthCookies",
  );
  try {
    res.cookie("accessToken", accessToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
    });
  } catch (error) {
    writeLogFileEntry(
      `Error while set Access Token as Cookie: ${(error as Error).message}`,
      res,
      2,
      "authenticationController/setAuthCookies",
    );
  } finally {
    writeLogFileEntry(
      `Access Token set successfully as Cookie`,
      res,
      2,
      "authenticationController/setAuthCookies",
    );
  }
}

export const me: RequestHandler = async (req, res, next) => {
  writeLogFileEntry("Enter Me", res, 2, "authenticationController/me");

  writeLogFileEntry(
    `Request ${JSON.stringify(req.cookies)}`,
    res,
    2,
    "authenticationController/me",
  );

  const { accessToken } = req.cookies;

  writeLogFileEntry(
    `accessToken requested: ${accessToken}`,
    res,
    2,
    "authenticationController/me",
  );

  if (!accessToken)
    throw new Error("Access token is required", { cause: { status: 401 } });

  try {
    const decoded = jwt.verify(accessToken, ACCESS_JWT_SECRET);

    if (!decoded.sub)
      throw new Error("Invalid or expired access token", {
        cause: { status: 403 },
      });

    const user = await User.findById(decoded.sub);

    if (!user) throw new Error("User not found", { cause: { status: 404 } });

    res.status(200).json({ message: "Valid token", user });
  } catch (error) {
    if (error instanceof jwt.TokenExpiredError) {
      return next(
        new Error("Expired access token", {
          cause: { status: 401, code: "ACCESS_TOKEN_EXPIRED" },
        }),
      );
    }

    return next(new Error("Invalid access token", { cause: { status: 401 } }));
  }
};

export const login: RequestHandler = async (req, res) => {
  writeLogFileEntry("Enter Login", res, 2, "authenticationController/login");

  const { email, password } = req.body;

  const user = await User.findOne({ email }).select("+password");
  if (!user) throw new Error("User not found", { cause: { status: 404 } });

  const isValid = await bcrypt.compare(password, user.password);

  if (!isValid) throw new Error("Incorrect credentials");

  writeLogFileEntry(
    `Verified Login User: ${user.email}`,
    res,
    2,
    "authenticationController/login",
  );

  const accessToken = createAccessToken({ id: user._id, role: user.role });

  writeLogFileEntry(
    `Access Token: ${JSON.stringify(accessToken)}`,
    res,
    2,
    "authenticationController/login",
  );
  setAuthCookies(res, accessToken);

  res.status(200).json({ message: "Logged in" });
};

export const logout: RequestHandler = async (req, res) => {
  writeLogFileEntry("Enter Logout", res, 2, "authenticationController/logout");
  res.clearCookie("accessToken");

  res.status(200).json({ message: "Successfully logged out" });
};

export const register: RequestHandler = async (req, res) => {
  writeLogFileEntry(
    "Enter Register",
    res,
    2,
    "authenticationController/register",
  );
  const { firstName, lastName, email, password, role } = req.body;

  const userExists = await User.exists({ email });
  if (userExists) throw new Error("Email already exists", { cause: 400 });

  const hashedPassword = await hashPassword(password);

  const newUser = await User.create({
    email,
    password: hashedPassword,
    firstName,
    lastName,
    role,
  } satisfies Omit<UserDTO, "confirmPassword">);

  const accessToken = createAccessToken({
    id: newUser._id,
    role: newUser.role,
  });

  setAuthCookies(res, accessToken);

  res.status(201).json({ message: "Registered" });
};
