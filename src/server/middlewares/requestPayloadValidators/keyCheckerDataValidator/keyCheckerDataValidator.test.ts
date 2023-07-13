import keyCheckerDataValidator from "./keyCheckerDataValidator";
import {
  expectedError,
  expectedLocals,
  invalidKeyCheckerPayload,
  validKeyCheckerPayload,
} from "./keyCheckerDataValidator.testObjects";

describe("Given keyCheckerDataValidator", () => {
  describe("When it's called with a valid payload", () => {
    test("then it should call next with nothing and put the keys in the res.locals with goNext as false", () => {
      const req: any = {
        body: validKeyCheckerPayload,
      };
      const res: any = {
        locals: {},
      };

      const next = jest.fn();

      keyCheckerDataValidator(req, res, next);

      expect(next).toHaveBeenCalledWith();
      expect(res.locals).toEqual(expectedLocals);
    });
  });

  describe("When it's called with an invalid payload", () => {
    test("then it should call next with an error with the appropiate messages", () => {
      const req: any = {
        body: invalidKeyCheckerPayload,
      };
      const res: any = {
        locals: {},
      };

      const next = jest.fn();

      keyCheckerDataValidator(req, res, next);

      expect(next).toHaveBeenCalledWith(expectedError);
    });
  });
});
