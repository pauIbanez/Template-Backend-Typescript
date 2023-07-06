import jwt from "jsonwebtoken";
import sendToken from "./sendToken";
import { mockToken, tokenResponse, userIdTest } from "./sendToken.testObject";

jest.mock("jsonwebtoken");

describe("Given sendToken", () => {
  describe("When it's called with a userId in res.locals and everything is ok", () => {
    test("Then it should call res.json with a token", () => {
      const res: any = {
        locals: {
          userId: userIdTest,
        },
        json: jest.fn(),
      };

      const next = jest.fn();

      jwt.sign = jest.fn().mockReturnValue(mockToken);

      sendToken(null, res, next);

      expect(next).not.toHaveBeenCalled();
      expect(res.json).toHaveBeenCalledWith(tokenResponse);
    });
  });

  describe("When it's called and the jwt.sing breaks", () => {
    test("Then it should call next", () => {
      const res: any = {
        locals: {
          userId: userIdTest,
        },
        json: jest.fn(),
      };

      jwt.sign = jest.fn().mockImplementation(() => {
        throw new Error("mock error");
      });

      const next = jest.fn();

      sendToken(null, res, next);

      expect(next).toHaveBeenCalled();
      expect(res.json).not.toHaveBeenCalled();
    });
  });
});
