import { getInvalidLoginDataError } from "../../../../data/errorObjects/dataValidationErrors";
import loginDataValidator from "./loginDataValidator";
import {
  invalidLoginDetailsString,
  invalidLoginPayload,
  validLoginPayload,
} from "./loginDataValidator.testObjects";

describe("Given loginDataValidator", () => {
  describe("When passed a valid payload", () => {
    test("Then it should call next with nothing", () => {
      const req: any = {
        body: validLoginPayload,
      };

      const next = jest.fn();

      loginDataValidator(req, null, next);

      expect(next).toHaveBeenCalledWith();
    });
  });

  describe("When passed an ivalid payload", () => {
    test("Then it should call next with an error", () => {
      const expectedError = getInvalidLoginDataError(invalidLoginDetailsString);

      const req: any = {
        body: invalidLoginPayload,
      };

      const next = jest.fn();

      loginDataValidator(req, null, next);

      expect(next).toHaveBeenCalledWith(expectedError);
    });
  });
});
