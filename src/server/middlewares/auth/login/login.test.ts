import {
  getInvalidPasswordError,
  getNotYetActivatedError,
  getUserDisabledError,
  getUserNotFoundForUsernameOrEmailError,
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
  noNoNormalPasswordLoginData,
  noNoOtpPasswordLoginData,
  noPasswordUserId,
  getTestUsers,
  notActiveUserId,
  notActiveUserLoginData,
  normalUserId,
} from "./login.testObjects";

let testUsers: any;

jest.mock("../../../../database/models/Users");

beforeEach(() => {
  jest.resetAllMocks();
  testUsers = getTestUsers();
});

describe("Given login", () => {
  describe("When it's called and eveything goes correctly with normal password", () => {
    test("The it should call next with nothing and put the userId in res.locals", async () => {
      const req: any = {
        body: loginData,
      };

      const res: any = {
        locals: {},
      };

      const next = jest.fn();

      Users.findOne = jest.fn().mockResolvedValue(testUsers.normalUser);

      await login(req, res, next);

      expect(next).toHaveBeenCalledWith();
      expect(res.locals.userId).toBe(normalUserId);
    });
  });

  describe("When it's called and eveything goes correctly with otp", () => {
    test("The it should call res.json with a token and call accountUsers.save witht he otpPassword removed", async () => {
      const req: any = {
        body: loginDataWithOtp,
      };

      const res: any = {
        locals: {},
      };

      const next = jest.fn();

      const user = testUsers.otpUser;

      Users.findOne = jest.fn().mockResolvedValue(user);

      await login(req, res, next);

      expect(next).toHaveBeenCalledWith();
      expect(res.locals.userId).toBe(normalUserId);

      expect(user.save).toHaveBeenCalled();
      expect(user.credentials.otpPassword).toBeFalsy();
    });
  });

  describe("When it's called and there is no user matching the username/email", () => {
    test("The it should call next with an error", async () => {
      const expectedError =
        getUserNotFoundForUsernameOrEmailError(missingUserEmail);

      const req: any = {
        body: missingUserLoginData,
      };

      const next = jest.fn();

      Users.findOne = jest.fn().mockResolvedValue(null);

      await login(req, null, next);

      expect(next).toHaveBeenCalledWith(expectedError);
    });
  });

  describe("When it's called with normal password and the user does not have one", () => {
    test("The it should call next with an error", async () => {
      const expectedError = getInvalidPasswordError(noPasswordUserId);

      const req: any = {
        body: noNoNormalPasswordLoginData,
      };

      const next = jest.fn();

      Users.findOne = jest.fn().mockResolvedValue(testUsers.noPasswordUser);

      await login(req, null, next);

      expect(next).toHaveBeenCalledWith(expectedError);
    });
  });

  describe("When it's called with wrong password", () => {
    test("The it should call next with an error", async () => {
      const expectedError = getInvalidPasswordError(normalUserId);

      const req: any = {
        body: invalidPasswordLoginData,
      };

      const next = jest.fn();

      Users.findOne = jest.fn().mockResolvedValue(testUsers.normalUser);

      await login(req, null, next);

      expect(next).toHaveBeenCalledWith(expectedError);
    });
  });

  describe("When it's called with otp password and the user does not have one", () => {
    test("The it should call next with an error", async () => {
      const expectedError = getInvalidPasswordError(noPasswordUserId);

      const req: any = {
        body: noNoOtpPasswordLoginData,
      };

      const next = jest.fn();

      Users.findOne = jest.fn().mockResolvedValue(testUsers.noPasswordUser);

      await login(req, null, next);

      expect(next).toHaveBeenCalledWith(expectedError);
    });
  });

  describe("When it's called with wrong otp password", () => {
    test("The it should call next with an error", async () => {
      const expectedError = getInvalidPasswordError(normalUserId);

      const req: any = {
        body: invalidOtpPasswordLoginData,
      };

      const next = jest.fn();

      Users.findOne = jest.fn().mockResolvedValue(testUsers.otpUser);

      await login(req, null, next);

      expect(next).toHaveBeenCalledWith(expectedError);
    });
  });

  describe("When it's called and the user is disabled", () => {
    test("The it should call next with an error", async () => {
      const expectedError = getUserDisabledError(disabledUserId);

      const req: any = {
        body: disabledUserLoginData,
      };

      const next = jest.fn();

      Users.findOne = jest.fn().mockResolvedValue(testUsers.disabledUser);

      await login(req, null, next);

      expect(next).toHaveBeenCalledWith(expectedError);
    });
  });

  describe("When it's called and the user is not yet active", () => {
    test("The it should call next with an error", async () => {
      const expectedError = getNotYetActivatedError(notActiveUserId);

      const req: any = {
        body: notActiveUserLoginData,
      };

      const next = jest.fn();

      Users.findOne = jest.fn().mockResolvedValue(testUsers.notActiveUser);

      await login(req, null, next);

      expect(next).toHaveBeenCalledWith(expectedError);
    });
  });
});
