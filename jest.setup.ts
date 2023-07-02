import jwt from "jsonwebtoken";
import TokenPayload from "./src/types/authTypes/TokenPayload";

let originalEnv: any;
beforeAll(() => {
  originalEnv = { ...process.env };
  process.env.TOKEN_SECRET = "Super secure secret";
});

afterAll(() => {
  process.env = originalEnv;
});

export const getValidToken = (tokenPayload?: TokenPayload) =>
  jwt.sign(
    tokenPayload || {
      accountId: "",
      id: "",
    },
    process.env.TOKEN_SECRET as string
  );

export const getInvalidToken = () => jwt.sign({}, "Other signer");
