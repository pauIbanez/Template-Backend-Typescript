import sendToken from "./sendToken";
import { tokenResponse, userId } from "./sendToken.testObject";

describe("Given refreshToken", () => {
  describe("When it's called", () => {
    test("Then it should call res.json with a token", () => {
      const res: any = {
        locals: {
          userId,
        },
        json: jest.fn(),
      };

      sendToken(null, res);

      expect(res.json).toHaveBeenCalledWith(tokenResponse);
    });
  });
});
