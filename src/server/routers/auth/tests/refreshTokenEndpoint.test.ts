import request from "supertest";
import app from "../../..";
import { getInvalidToken, getValidToken } from "../../../../../jest.setup";
import {
  invalidTokenResponse,
  tokenPayload,
  tokenResponse,
} from "./refreshTokenendpoint.testObjects";

describe("Given /auth/refreshToken ", () => {
  describe("When it's called with a valid token", () => {
    test("Then it should respond with a token", async () => {
      const requestPath = "/auth/refreshToken";
      const { body } = await request(app)
        .get(requestPath)
        .auth(getValidToken(tokenPayload), { type: "bearer" })
        .expect(200);

      expect(body).toMatchObject(tokenResponse);
    });
  });

  describe("When it's called with an invalid token", () => {
    test("Then it should respond with 401", async () => {
      const requestPath = "/auth/refreshToken";
      const { body } = await request(app)
        .get(requestPath)
        .auth(getInvalidToken(), { type: "bearer" })
        .expect(401);

      expect(body).toMatchObject(invalidTokenResponse);
    });
  });
});
