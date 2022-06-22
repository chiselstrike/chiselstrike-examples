import { withIronSessionApiRoute, withIronSessionSsr } from "iron-session/next";
import { NextApiHandler } from "next";

const sessionOptions = {
  password: "complex_password_at_least_32_characters_long",
  cookieName: "chiselstrike_cookie10",
  // secure: true should be used in production (HTTPS) but can't be used in development (HTTP)
  cookieOptions: {
    secure: process.env.NODE_ENV === "production",
  },
};

export function withSessionRoute(handler: NextApiHandler) {
  return withIronSessionApiRoute(handler, sessionOptions);
}

export function withSessionSsr(
  handler: Parameters<typeof withIronSessionSsr>[0]
) {
  return withIronSessionSsr(handler, sessionOptions);
}
