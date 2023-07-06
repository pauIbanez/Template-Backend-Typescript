import loginDataValidator from "./loginDataValidator";
import {
  expectedInvalidLoginDataMessage,
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

  describe("When passed a payload with missing email", () => {
    test("Then it should call next with an error with the message 'Missing username or email'", () => {
      const req: any = {
        body: invalidLoginPayload,
      };

      const next = jest.fn();

      loginDataValidator(req, null, next);

      expect(next).toHaveBeenCalledWith(expectedInvalidLoginDataMessage);
    });
  });
});
