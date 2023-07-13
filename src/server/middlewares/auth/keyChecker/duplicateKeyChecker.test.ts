import Users from "../../../../database/models/Users";
import duplicateKeyChecker from "./duplicateKeyChecker";
import {
  correctLocals,
  correctLocalsGoNext,
  expectedResponse,
  expectedDuplicateEmailError,
  getQueryFromLocals,
  getTestUsers,
  repeatEmailLocals,
  repeatUsernameLocals,
  expectedDuplicateUsernameError,
  repeatUsernameAndEmailLocals,
  expectedDuplicateEmailAndUsernameError,
} from "./duplicateKeyChecker.testObjects";

jest.mock("../../../../database/models/Users");

beforeEach(() => {
  jest.resetAllMocks();
});

describe("Given duplicateKeyChecker", () => {
  describe("When it's called and eveything is ok with goNext as true", () => {
    test("Then it should call next with nothing, and not call res.json", async () => {
      const res: any = {
        json: jest.fn(),
        locals: correctLocalsGoNext,
      };

      const next = jest.fn();
      Users.find = jest.fn().mockResolvedValue([]);

      await duplicateKeyChecker(null, res, next);

      expect(next).toHaveBeenCalledWith();
      expect(Users.find).toHaveBeenCalledWith(
        getQueryFromLocals(correctLocalsGoNext)
      );
      expect(res.json).not.toHaveBeenCalled();
    });
  });
  describe("When it's called and eveything is ok with goNext as false", () => {
    test("Then it should call res.json and not next", async () => {
      const res: any = {
        json: jest.fn(),
        locals: correctLocals,
      };

      const next = jest.fn();
      Users.find = jest.fn().mockResolvedValue([]);

      await duplicateKeyChecker(null, res, next);

      expect(next).not.toHaveBeenCalled();
      expect(Users.find).toHaveBeenCalledWith(
        getQueryFromLocals(correctLocalsGoNext)
      );
      expect(res.json).toHaveBeenCalledWith(expectedResponse);
    });
  });

  describe("When it's called and if finds a duplicate email", () => {
    test("Then it should call next with an error", async () => {
      const res: any = {
        json: jest.fn(),
        locals: repeatEmailLocals,
      };

      const next = jest.fn();
      Users.find = jest.fn().mockResolvedValue(getTestUsers());

      await duplicateKeyChecker(null, res, next);

      expect(next).toHaveBeenCalledWith(expectedDuplicateEmailError);
      expect(Users.find).toHaveBeenCalledWith(
        getQueryFromLocals(repeatEmailLocals)
      );
      expect(res.json).not.toHaveBeenCalled();
    });
  });
  describe("When it's called and if finds a duplicate username", () => {
    test("Then it should call next with an error", async () => {
      const res: any = {
        json: jest.fn(),
        locals: repeatUsernameLocals,
      };

      const next = jest.fn();
      Users.find = jest.fn().mockResolvedValue(getTestUsers());

      await duplicateKeyChecker(null, res, next);

      expect(next).toHaveBeenCalledWith(expectedDuplicateUsernameError);
      expect(Users.find).toHaveBeenCalledWith(
        getQueryFromLocals(repeatUsernameLocals)
      );
      expect(res.json).not.toHaveBeenCalled();
    });
  });

  describe("When it's called and if finds a duplicate email", () => {
    test("Then it should call next with an error", async () => {
      const res: any = {
        json: jest.fn(),
        locals: repeatUsernameAndEmailLocals,
      };

      const next = jest.fn();
      Users.find = jest.fn().mockResolvedValue(getTestUsers());

      await duplicateKeyChecker(null, res, next);

      expect(next).toHaveBeenCalledWith(expectedDuplicateEmailAndUsernameError);
      expect(Users.find).toHaveBeenCalledWith(
        getQueryFromLocals(repeatUsernameAndEmailLocals)
      );
      expect(res.json).not.toHaveBeenCalled();
    });
  });
});
