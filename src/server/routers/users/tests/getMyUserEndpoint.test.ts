/* eslint-disable import/first */
/* eslint-disable import/newline-after-import */

import { MongoMemoryServer } from "mongodb-memory-server";
import mongoose from "mongoose";
import request from "supertest";
import app from "../../..";
import connectToDB from "../../../../database";
import Users from "../../../../database/models/Users";
import {
  expectedCorrectResponse,
  expectedNoAuthError,
  expectedMissingUserError,
  getTestUsers,
  myTestUserId,
  expectedInvalidTokenError,
} from "./getMyUserEndpoint.testObjects";
import { getInvalidToken, getValidToken } from "../../../../../jest.setup";

let mongoServer: MongoMemoryServer;
beforeAll(async () => {
  mongoServer = await MongoMemoryServer.create();
  const connectionString = mongoServer.getUri();

  await connectToDB(connectionString);
});

afterAll(async () => {
  await mongoose.connection.close();
  await mongoServer.stop();
});

beforeEach(async () => {
  await Users.create(getTestUsers());
});

afterEach(async () => {
  await Users.deleteMany({});
  jest.resetAllMocks();
});

describe("Given /users/myUser endpoint", () => {
  describe("When it's called with valid auth and user", () => {
    test("Then it should respond with 200 and the user corresponding to that auth token", async () => {
      const requestPath = "/users/myUser";

      const validToken = getValidToken({
        id: myTestUserId,
        tokenRefreshTime: 1,
      });

      const { body } = await request(app)
        .get(requestPath)
        .set("Authorization", `Bearer ${validToken}`)
        .expect(200);

      expect(body).toEqual(expectedCorrectResponse);
    });
  });
  describe("When it's called with valid auth and but no user matches", () => {
    test("Then it should respond with 404 and an error", async () => {
      const requestPath = "/users/myUser";

      const validToken = getValidToken({
        id: "some otherId",
        tokenRefreshTime: 1,
      });

      const { body } = await request(app)
        .get(requestPath)
        .set("Authorization", `Bearer ${validToken}`)
        .expect(404);

      expect(body).toEqual(expectedMissingUserError);
    });
  });

  describe("When it's called with invalid auth", () => {
    test("Then it should respond with 401 and an error", async () => {
      const requestPath = "/users/myUser";

      const invalidToken = getInvalidToken();

      const { body } = await request(app)
        .get(requestPath)
        .set("Authorization", `Bearer ${invalidToken}`)
        .expect(401);

      expect(body).toEqual(expectedInvalidTokenError);
    });
  });

  describe("When it's called with no auth", () => {
    test("Then it should respond with 401 and an error", async () => {
      const requestPath = "/users/myUser";

      const { body } = await request(app).get(requestPath).expect(401);

      expect(body).toEqual(expectedNoAuthError);
    });
  });
});
