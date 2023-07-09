/* eslint-disable import/first */
const mockDebugToConsole = jest.fn();
jest.mock("debug", () => () => mockDebugToConsole);

import {
  controlledError,
  expectedControlledErrorResponse,
  expectedDebugMessage,
  expectedErrorInfo,
  expectedNoExtraDataErrorInfo,
  expectedUncontrolledErrorResponse,
  getNoExtraDataControlledError,
  uncontrolledError,
} from "./errorsHandler.testObjects";
import errorsHandler from "./errorsHandler";

afterEach(() => {
  jest.resetAllMocks();
});

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
      expect(mockDebugToConsole).not.toHaveBeenCalled();
    });
  });

  describe("When it's called passing a controlled error with extradata and the DEBUG_VERBOSE as true", () => {
    test("Then it should call debug with the error info", () => {
      process.env.DEBUG_VERBOSE = "true";

      const res: any = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };

      errorsHandler(controlledError, null, res, null);

      const receivedStrings = mockDebugToConsole.mock.calls[0];
      expect(receivedStrings).toEqual(expectedErrorInfo);
    });
  });

  describe("When it's called passing a controlled error without extradata and the DEBUG_VERBOSE as true", () => {
    test("Then it should call debug with the error info", () => {
      process.env.DEBUG_VERBOSE = "true";

      const res: any = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };
      const error = getNoExtraDataControlledError();

      errorsHandler(error, null, res, null);

      const receivedStrings = mockDebugToConsole.mock.calls[0];
      expect(receivedStrings).toEqual(expectedNoExtraDataErrorInfo);
    });
  });
});
