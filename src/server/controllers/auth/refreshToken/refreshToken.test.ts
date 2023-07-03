import refreshToken from "./refreshToken";
import { tokenResponse, userId } from "./refreshToken.testObject";

describe("Given refreshToken", () => {
  describe("When it's called", () => {
    test("Then it should call res.json with a token", () => {
      const res: any = {
        locals: {
          userId,
        },
        json: jest.fn(),
      };

      refreshToken(null, res);

      expect(res.json).toHaveBeenCalledWith(tokenResponse);
    });
  });
});
