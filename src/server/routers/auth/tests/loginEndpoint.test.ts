/* eslint-disable import/first */
/* eslint-disable import/newline-after-import */

import { MongoMemoryServer } from "mongodb-memory-server";
import mongoose from "mongoose";
import request from "supertest";
import app from "../../..";
import connectToDB from "../../../../database";
import Users from "../../../../database/models/Users";
import {
  disabledUserError,
  disabledUserLoginData,
  genericLoginError,
  getTestUsers,
  missingUserLoginData,
  noPasswordLoginData,
  normalUserLoginData,
  invalidPasswordLoginData,
  otpUserLoginData,
} from "./loginEndpoint.testObjects";

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
  await Users.create(await getTestUsers());
});

afterEach(async () => {
  await Users.deleteMany({});
  jest.resetAllMocks();
});

describe("Given /auth/login endpoint", () => {
  describe("When it's called and eveything is correct", () => {
    test("The it should respond with 200 and a token", async () => {
      const requestPath = "/auth/login";

      const { body } = await request(app)
        .post(requestPath)
        .send(normalUserLoginData);

      expect(body.token).toBeTruthy();
    });
  });

  describe("When it's called withOTP and eveything is correct", () => {
    test("The it should respond with 200 and a token", async () => {
      const requestPath = "/auth/login";

      const { body } = await request(app)
        .post(requestPath)
        .send(otpUserLoginData);

      expect(body.token).toBeTruthy();
    });
  });

  describe("When it's called with an invalid password", () => {
    test("The it should respond with 401 and an error", async () => {
      const requestPath = "/auth/login";

      const { body } = await request(app)
        .post(requestPath)
        .send(invalidPasswordLoginData);

      expect(body).toMatchObject(genericLoginError);
    });
  });

  describe("When it's called and the user has no password", () => {
    test("The it should respond with 401 and an error", async () => {
      const requestPath = "/auth/login";

      const { body } = await request(app)
        .post(requestPath)
        .send(noPasswordLoginData);

      expect(body).toMatchObject(genericLoginError);
    });
  });

  describe("When it's called and the user is disabled", () => {
    test("The it should respond with 401 and an error", async () => {
      const requestPath = "/auth/login";

      const { body } = await request(app)
        .post(requestPath)
        .send(disabledUserLoginData);

      expect(body).toMatchObject(disabledUserError);
    });
  });

  describe("When it's called and there is no user with that email", () => {
    test("The it should respond with 401 and an error", async () => {
      const requestPath = "/auth/login";

      const { body } = await request(app)
        .post(requestPath)
        .send(missingUserLoginData);

      expect(body).toMatchObject(genericLoginError);
    });
  });
});
