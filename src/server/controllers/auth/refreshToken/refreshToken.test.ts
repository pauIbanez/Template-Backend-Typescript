import refreshToken from "./refreshToken";
import { accountId, tokenResponse, userId } from "./refreshToken.testObject";

describe("Given refreshToken", () => {
  describe("When it's called", () => {
    test("Then it should call res.json with a token", () => {
      const res: any = {
        locals: {
          accountId,
          userId,
        },
        json: jest.fn(),
      };

      refreshToken(null, res);

      expect(res.json).toHaveBeenCalledWith(tokenResponse);
    });
  });
});
