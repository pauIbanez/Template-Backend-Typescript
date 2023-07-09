/* eslint-disable import/first */
/* eslint-disable import/newline-after-import */

import { MongoMemoryServer } from "mongodb-memory-server";
import mongoose from "mongoose";
import request from "supertest";
import app from "../../..";
import connectToDB from "../../../../database";
import Users from "../../../../database/models/Users";
import {
  expectedDisabledUserError,
  disabledUserLoginData,
  expectedGenericLoginError,
  getTestUsers,
  missingUserLoginData,
  noNormalPasswordLoginData,
  noOtpPasswordLoginData,
  loginData,
  invalidPasswordLoginData,
  loginDataWithOtp,
  invalidOtpPasswordLoginData,
  usernameLoginData,
  invalidUsernameLoginData,
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
  await Users.create(getTestUsers());
});

afterEach(async () => {
  await Users.deleteMany({});
  jest.resetAllMocks();
});

describe("Given /auth/login endpoint", () => {
  describe("When it's called with correct loginData by email eveything is correct", () => {
    test("Then it should respond with 200 and a token", async () => {
      const requestPath = "/auth/login";

      const { body } = await request(app)
        .post(requestPath)
        .send(loginData)
        .expect(200);

      expect(body.token).toBeTruthy();
    });
  });

  describe("When it's called with correct loginData by username eveything is correct", () => {
    test("Then it should respond with 200 and a token", async () => {
      const requestPath = "/auth/login";

      const { body } = await request(app)
        .post(requestPath)
        .send(usernameLoginData)
        .expect(200);

      expect(body.token).toBeTruthy();
    });
  });

  describe("When it's called withOTP and eveything is correct", () => {
    test("Then it should respond with 200 and a token", async () => {
      const requestPath = "/auth/login";
      process.env.DEBUG_VERBOSE = "true";

      const { body } = await request(app)
        .post(requestPath)
        .send(loginDataWithOtp)
        .expect(200);

      expect(body.token).toBeTruthy();
    });
  });

  describe("When it's called with an invalid password", () => {
    test("Then it should respond with 401 and an error", async () => {
      const requestPath = "/auth/login";

      const { body } = await request(app)
        .post(requestPath)
        .send(invalidPasswordLoginData)
        .expect(401);

      expect(body).toMatchObject(expectedGenericLoginError);
    });
  });

  describe("When it's called and the user has no password", () => {
    test("Then it should respond with 401 and an error", async () => {
      const requestPath = "/auth/login";

      const { body } = await request(app)
        .post(requestPath)
        .send(noNormalPasswordLoginData)
        .expect(401);

      expect(body).toMatchObject(expectedGenericLoginError);
    });
  });

  describe("When it's called with an invalid OTP password", () => {
    test("Then it should respond with 401 and an error", async () => {
      const requestPath = "/auth/login";

      const { body } = await request(app)
        .post(requestPath)
        .send(invalidOtpPasswordLoginData)
        .expect(401);

      expect(body).toMatchObject(expectedGenericLoginError);
    });
  });

  describe("When it's called and the user has no OTP password", () => {
    test("Then it should respond with 401 and an error", async () => {
      const requestPath = "/auth/login";

      const { body } = await request(app)
        .post(requestPath)
        .send(noOtpPasswordLoginData)
        .expect(401);

      expect(body).toMatchObject(expectedGenericLoginError);
    });
  });

  describe("When it's called and the user is disabled", () => {
    test("Then it should respond with 403 and an error", async () => {
      const requestPath = "/auth/login";

      const { body } = await request(app)
        .post(requestPath)
        .send(disabledUserLoginData)
        .expect(403);

      expect(body).toMatchObject(expectedDisabledUserError);
    });
  });

  describe("When it's called and the user is not yet active", () => {
    test("Then it should respond with 403 and an error", async () => {
      const requestPath = "/auth/login";

      const { body } = await request(app)
        .post(requestPath)
        .send(disabledUserLoginData)
        .expect(403);

      expect(body).toMatchObject(expectedDisabledUserError);
    });
  });

  describe("When it's called and there is no user with that email", () => {
    test("Then it should respond with 401 and an error", async () => {
      const requestPath = "/auth/login";

      const { body } = await request(app)
        .post(requestPath)
        .send(missingUserLoginData)
        .expect(401);

      expect(body).toMatchObject(expectedGenericLoginError);
    });
  });

  describe("When it's called and there is no user with that username", () => {
    test("Then it should respond with 401 and an error", async () => {
      const requestPath = "/auth/login";

      const { body } = await request(app)
        .post(requestPath)
        .send(invalidUsernameLoginData)
        .expect(401);

      expect(body).toMatchObject(expectedGenericLoginError);
    });
  });
});
