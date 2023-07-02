/* eslint-disable import/first */
const mockDebugToConsole = jest.fn();
jest.mock("debug", () => () => mockDebugToConsole);

import {
  controlledError,
  expectedControlledErrorResponse,
  expectedDebugMessage,
  expectedUncontrolledErrorResponse,
  uncontrolledError,
} from "./errorsHandler.testObjects";
import errorsHandler from "./errorsHandler";

describe("Given errorsHandler", () => {
  describe("When it's called passing an uncontrolled error", () => {
    test("Then it should call debugToConsole with the error message", () => {
      const res: any = {
        status: () => ({ json: () => {} }),
      };

      errorsHandler(uncontrolledError as any, null, res, null);

      expect(mockDebugToConsole).toHaveBeenCalledWith(expectedDebugMessage);
    });

    test("Then it should call res.status with 500 and with the error message 'Internal server error'", () => {
      const res: any = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };

      errorsHandler(uncontrolledError as any, null, res, null);

      expect(res.status).toHaveBeenCalledWith(
        expectedUncontrolledErrorResponse.code
      );
      expect(res.json).toHaveBeenCalledWith(expectedUncontrolledErrorResponse);
    });
  });

  describe("When it's called passing a controlled error statusCode 400 and message 'Bad request'", () => {
    test("Then it should call res.status with 400 and with the error message 'Bad request'", () => {
      const res: any = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };

      errorsHandler(controlledError, null, res, null);

      expect(res.status).toHaveBeenCalledWith(controlledError.statusCode);
      expect(res.json).toHaveBeenCalledWith(expectedControlledErrorResponse);
    });
  });
});
