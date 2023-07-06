import registrationDataValidator from "./registrationDataValidator";
import {
  expectedBody,
  expectedInvalidRegistrationDataMessage,
  invalidRegistrationPayload,
  validRegistrationPayload,
} from "./registrationDataValidator.testObjects";

describe("Given registrationDataValidator", () => {
  describe("When it's called with a valid payload", () => {
    test("then it should call next with nothing", () => {
      const req: any = {
        body: validRegistrationPayload,
      };

      const next = jest.fn();

      registrationDataValidator(req, null, next);

      expect(next).toHaveBeenCalledWith();
      expect(req.body).toEqual(expectedBody);
    });
  });

  describe("When it's called with an invalid payload", () => {
    test("then it should call next with an error with the appropiate messages", () => {
      const req: any = {
        body: invalidRegistrationPayload,
      };

      const next = jest.fn();

      registrationDataValidator(req, null, next);

      expect(next).toHaveBeenCalledWith(expectedInvalidRegistrationDataMessage);
    });
  });
});
