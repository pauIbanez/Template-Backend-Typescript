/* eslint-disable import/first */
/* eslint-disable import/newline-after-import */

import { MongoMemoryServer } from "mongodb-memory-server";
import mongoose from "mongoose";
import request from "supertest";
import app from "../../..";
import connectToDB from "../../../../database";
import Users from "../../../../database/models/Users";
import {
  alreadyCreatedForEmailRegistrationData,
  createdUser,
  expectedEmailAlreadyInUseError,
  sucessResponse,
  validRegistrationData,
} from "./registerEndpoint.testObjects";

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
  await Users.create(createdUser);
});

afterEach(async () => {
  await Users.deleteMany({});
  jest.resetAllMocks();
});

describe("Given /auth/login endpoint", () => {
  describe("When it's called with correct registrationData by email eveything is correct", () => {
    test("Then it should respond with 201 and a sucess message", async () => {
      const requestPath = "/auth/register";

      const { body } = await request(app)
        .post(requestPath)
        .send(validRegistrationData)
        .expect(201);

      expect(body).toEqual(sucessResponse);
    });
  });

  describe("When it's called with correct registrationData but user for that email is already registered", () => {
    test("Then it should respond with 400 and an error", async () => {
      const requestPath = "/auth/register";

      process.env.DEBUG_VERBOSE = "true";
      const { body } = await request(app)
        .post(requestPath)
        .send(alreadyCreatedForEmailRegistrationData)
        .expect(400);

      expect(body).toEqual(expectedEmailAlreadyInUseError);
    });
  });
});
