import { getInvalidAccountCreationDataError } from "../../../../data/errorObjects/accountErrors";
import accountCreationDataValidator from "./accountCreationDataValidator";
import {
  expectedDetailsStringForInvalidEmail,
  expectedDetailsStringForMissingEmail,
  invalidEmailAccountCreationPayload,
  missingEmailAccountCreationPayload,
  validAccountCreationPayload,
} from "./accountCreationDataValidator.testObjects";

describe("Given accountCreationDataValidator", () => {
  describe("When called with a valid payload", () => {
    test("Then it should call next with no error", () => {
      const req: any = {
        body: validAccountCreationPayload,
      };

      const next = jest.fn();

      accountCreationDataValidator(req, null, next);

      expect(next).toHaveBeenCalledWith();
    });
  });
  describe("When passed an invalid object", () => {
    test("Then it should call next with an error", () => {
      const expectedError = getInvalidAccountCreationDataError(
        undefined,
        expectedDetailsStringForMissingEmail
      );

      const req: any = {
        body: missingEmailAccountCreationPayload,
      };

      const next = jest.fn();

      accountCreationDataValidator(req, null, next);

      expect(next).toHaveBeenCalledWith(expectedError);
    });
  });

  describe("When passed an invalid object", () => {
    test("Then it should call next with an error", () => {
      const expectedError = getInvalidAccountCreationDataError(
        invalidEmailAccountCreationPayload.superUserEmail,
        expectedDetailsStringForInvalidEmail
      );

      const req: any = {
        body: invalidEmailAccountCreationPayload,
      };

      const next = jest.fn();

      accountCreationDataValidator(req, null, next);

      expect(next).toHaveBeenCalledWith(expectedError);
    });
  });
});
