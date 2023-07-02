/* eslint-disable import/first */
/* eslint-disable import/newline-after-import */
import dotenv from "dotenv";
dotenv.config();

import jwt from "jsonwebtoken";
import {
  getInvalidPasswordError,
  getUserDisabledError,
  getUserNotFoundForEmailError,
} from "../../../../data/errorObjects/userErrors";
import Users from "../../../../database/models/Users";
import login from "./login";
import {
  disabledUserId,
  disabledUserLoginData,
  invalidOtpPasswordLoginData,
  invalidPasswordLoginData,
  loginData,
  loginDataWithOtp,
  missingUserEmail,
  missingUserLoginData,
  nativeError,
  noNoNormalPasswordLoginData,
  noNoOtpPasswordLoginData,
  noPasswordUserId,
  getTestUsers,
  tokenResponse,
  validUserId,
} from "./login.testObjects";

jest.mock("../../../../database/models/AccountUsers");

let testUsers: any;

beforeEach(() => {
  jest.resetAllMocks();
  testUsers = getTestUsers();
});

describe("Given login", () => {
  describe("When it's called and eveything goes correctly with normal password", () => {
    test("The it should call res.json with a token", async () => {
      const req: any = {
        body: loginData,
      };

      const res: any = {
        json: jest.fn(),
      };

      const next = jest.fn();

      Users.findOne = jest.fn().mockResolvedValue(testUsers.normalUser);

      await login(req, res, next);

      expect(next).not.toHaveBeenCalled();
      expect(res.json).toHaveBeenCalledWith(tokenResponse);
    });
  });

  describe("When it's called and eveything goes correctly with otp", () => {
    test("The it should call res.json with a token and call accountUsers.save witht he otpPassword removed", async () => {
      const req: any = {
        body: loginDataWithOtp,
      };

      const res: any = {
        json: jest.fn(),
      };

      const next = jest.fn();

      const user = testUsers.otpUser;

      Users.findOne = jest.fn().mockResolvedValue(user);

      await login(req, res, next);

      expect(next).not.toHaveBeenCalled();
      expect(user.save).toHaveBeenCalled();
      expect(user.credentials.otpPassword).toBeFalsy();
      expect(res.json).toHaveBeenCalledWith(tokenResponse);
    });
  });

  describe("When it's called with normal password and the user does not have one", () => {
    test("The it should call next with an error", async () => {
      const expectedError = getInvalidPasswordError(noPasswordUserId);

      const req: any = {
        body: noNoNormalPasswordLoginData,
      };

      const res: any = {
        json: jest.fn(),
      };

      const next = jest.fn();

      Users.findOne = jest.fn().mockResolvedValue(testUsers.noPasswordUser);

      await login(req, res, next);

      expect(next).toHaveBeenCalledWith(expectedError);
      expect(res.json).not.toHaveBeenCalled();
    });
  });

  describe("When it's called with wrong password", () => {
    test("The it should call next with an error", async () => {
      const expectedError = getInvalidPasswordError(validUserId);

      const req: any = {
        body: invalidPasswordLoginData,
      };

      const res: any = {
        json: jest.fn(),
      };

      const next = jest.fn();

      Users.findOne = jest.fn().mockResolvedValue(testUsers.normalUser);

      await login(req, res, next);

      expect(next).toHaveBeenCalledWith(expectedError);
      expect(res.json).not.toHaveBeenCalled();
    });
  });

  describe("When it's called with otp password and the user does not have one", () => {
    test("The it should call next with an error", async () => {
      const expectedError = getInvalidPasswordError(noPasswordUserId);

      const req: any = {
        body: noNoOtpPasswordLoginData,
      };

      const res: any = {
        json: jest.fn(),
      };

      const next = jest.fn();

      Users.findOne = jest.fn().mockResolvedValue(testUsers.noPasswordUser);

      await login(req, res, next);

      expect(next).toHaveBeenCalledWith(expectedError);
      expect(res.json).not.toHaveBeenCalled();
    });
  });

  describe("When it's called with wrong otp password", () => {
    test("The it should call next with an error", async () => {
      const expectedError = getInvalidPasswordError(validUserId);

      const req: any = {
        body: invalidOtpPasswordLoginData,
      };

      const res: any = {
        json: jest.fn(),
      };

      const next = jest.fn();

      Users.findOne = jest.fn().mockResolvedValue(testUsers.otpUser);

      await login(req, res, next);

      expect(next).toHaveBeenCalledWith(expectedError);
      expect(res.json).not.toHaveBeenCalled();
    });
  });

  describe("When it's called and the user is disabled", () => {
    test("The it should call next with an error", async () => {
      const expectedError = getUserDisabledError(disabledUserId);

      const req: any = {
        body: disabledUserLoginData,
      };

      const res: any = {
        json: jest.fn(),
      };

      const next = jest.fn();

      Users.findOne = jest.fn().mockResolvedValue(testUsers.disabledUser);

      await login(req, res, next);

      expect(next).toHaveBeenCalledWith(expectedError);
      expect(res.json).not.toHaveBeenCalled();
    });
  });

  describe("When it's called and the user is not found", () => {
    test("The it should call next with an error", async () => {
      const expectedError = getUserNotFoundForEmailError(missingUserEmail);

      const req: any = {
        body: missingUserLoginData,
      };

      const res: any = {
        json: jest.fn(),
      };

      const next = jest.fn();

      Users.findOne = jest.fn().mockResolvedValue(null);

      await login(req, res, next);

      expect(next).toHaveBeenCalledWith(expectedError);
      expect(res.json).not.toHaveBeenCalled();
    });
  });

  describe("When it's called and something throws an error", () => {
    test("The it should call next with the thrown error", async () => {
      const req: any = {
        body: loginData,
      };

      const res: any = {
        json: jest.fn(),
      };

      const next = jest.fn();

      jwt.sign = jest.fn().mockImplementation(() => {
        throw nativeError;
      });
      Users.findOne = jest.fn().mockResolvedValue(testUsers.normalUser);

      await login(req, res, next);

      expect(next).toHaveBeenCalledWith(nativeError);
      expect(res.json).not.toHaveBeenCalled();
    });
  });
});
