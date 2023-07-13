import Users from "../../../../database/models/Users";
import getMyUser from "./getMyUser";
import {
  expectedError,
  foundTestUser,
  missingOtherUserTestId,
  myUserTestId,
  thrownError,
} from "./getMyUser.testObjects";

jest.mock("../../../../database/models/Users");

beforeEach(() => {
  jest.resetAllMocks();
});

describe("Given getMyUser", () => {
  describe("When it's called and eveything is ok", () => {
    test("Then it should call Users.findById with the provided id and call res.json with the user object", async () => {
      const res: any = {
        json: jest.fn(),
        locals: {
          userId: myUserTestId,
        },
      };

      const next = jest.fn();
      Users.findById = jest.fn().mockReturnValue({
        select: jest.fn().mockResolvedValue(foundTestUser),
      });

      await getMyUser(null, res, next);

      expect(next).not.toHaveBeenCalled();
      expect(Users.findById).toHaveBeenCalledWith(myUserTestId);
      expect(res.json).toHaveBeenCalledWith(foundTestUser);
    });
  });

  describe("When it's called and the user is not found", () => {
    test("Then it should call next with the userNotFoundForId error and not res.json", async () => {
      const res: any = {
        json: jest.fn(),
        locals: {
          userId: missingOtherUserTestId,
        },
      };

      const next = jest.fn();
      Users.findById = jest.fn().mockReturnValue({
        select: jest.fn().mockResolvedValue(null),
      });

      await getMyUser(null, res, next);

      expect(next).toHaveBeenCalledWith(expectedError);
      expect(Users.findById).toHaveBeenCalledWith(missingOtherUserTestId);
      expect(res.json).not.toHaveBeenCalled();
    });
  });

  describe("When it's called and something breaks", () => {
    test("Then it should call next the thrown error", async () => {
      const res: any = {
        json: jest.fn(),
        locals: {
          userId: missingOtherUserTestId,
        },
      };

      const next = jest.fn();
      Users.findById = jest.fn().mockReturnValue({
        select: jest.fn().mockRejectedValue(thrownError),
      });

      await getMyUser(null, res, next);

      expect(next).toHaveBeenCalledWith(thrownError);
      expect(Users.findById).toHaveBeenCalledWith(missingOtherUserTestId);
      expect(res.json).not.toHaveBeenCalled();
    });
  });
});
