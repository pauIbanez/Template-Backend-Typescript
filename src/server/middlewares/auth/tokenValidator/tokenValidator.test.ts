/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  getInvalidTokenError,
  getNoAuthHeaderError,
} from "../../../../data/errorObjects/authErrors";
import tokenValidator from "./tokenValidator";
import {
  getInvalidAuth,
  getValidAuth,
  tokenPayload,
} from "./tokenValidator.testObjects";

describe("Given tokenValidator", () => {
  describe("When it's callend passing a valid token", () => {
    test("Then it should call next with nothing and put account and userId in res.locals", () => {
      const req: any = {
        header: jest.fn().mockReturnValue(getValidAuth()),
      };

      const res: any = {
        locals: {},
      };

      const next = jest.fn();

      tokenValidator(req, res, next);

      expect(next).toHaveBeenCalledWith();
      expect(res.locals.accountId).toBe(tokenPayload.accountId);
      expect(res.locals.userId).toBe(tokenPayload.id);
    });
  });

  describe("When it's callend passing an invalid token", () => {
    test("Then it should call next with an error", () => {
      const expectedError = getInvalidTokenError();

      const req: any = {
        header: jest.fn().mockReturnValue(getInvalidAuth()),
      };

      const next = jest.fn();

      tokenValidator(req, null, next);

      expect(next).toHaveBeenCalledWith(expectedError);
    });
  });

  describe("When it's callend passing no token", () => {
    test("Then it should call next with an error", () => {
      const expectedError = getNoAuthHeaderError();

      const req: any = {
        header: jest.fn().mockReturnValue(null),
      };

      const next = jest.fn();

      tokenValidator(req, null, next);

      expect(next).toHaveBeenCalledWith(expectedError);
    });
  });
});
