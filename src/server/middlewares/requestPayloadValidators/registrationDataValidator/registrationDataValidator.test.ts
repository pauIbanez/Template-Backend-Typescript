import { getInvalidRegistrationDataError } from "../../../../data/errorObjects/dataValidationErrors";
import registrationDataValidator from "./registrationDataValidator";
import {
  accountId,
  expectedDetailsString,
  invalidRegistrationPayload,
  userId,
  validRegistrationPayload,
} from "./registrationDataValidator.testObjects";

describe("Given registrationDataValidator", () => {
  describe("When it's called with a valid payload", () => {
    test("then it should call next with nothing", () => {
      const req: any = {
        body: validRegistrationPayload,
      };

      const res: any = {
        locals: {
          accountId,
          userId,
        },
      };

      const next = jest.fn();

      registrationDataValidator(req, res, next);

      expect(next).toHaveBeenCalledWith();
    });
  });

  describe("When it's called with an invalid payload", () => {
    test("then it should call next with an error", () => {
      const expectedError = getInvalidRegistrationDataError(
        accountId,
        userId,
        expectedDetailsString
      );

      const req: any = {
        body: invalidRegistrationPayload,
      };

      const res: any = {
        locals: {
          accountId,
          userId,
        },
      };

      const next = jest.fn();

      registrationDataValidator(req, res, next);

      expect(next).toHaveBeenCalledWith(expectedError);
    });
  });
});
