import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import TokenPayload from "./src/types/authTypes/TokenPayload";

dotenv.config();

const originalEnv = { ...process.env };

beforeEach(() => {
  jest.resetModules();
  process.env = { ...originalEnv };
  process.env.TOKEN_SECRET = "Super secure secret";
});

afterEach(() => {
  process.env = originalEnv;
});

export const getValidToken = (tokenPayload?: TokenPayload) =>
  jwt.sign(
    tokenPayload || {
      id: "",
      tokenRefreshTime: 1,
    },
    process.env.TOKEN_SECRET as string
  );

export const getInvalidToken = () => jwt.sign({}, "Other signer");
