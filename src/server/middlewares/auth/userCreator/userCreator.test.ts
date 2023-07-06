import hashPassword from "../../../utils/auth/hashPassword/hashPassword";
import createUser from "./userCreator";
import {
  expectedCreatedUser,
  mockHashedPassword,
  testUserRegistrationData,
} from "./userCreator.testObjects";

jest.mock("../../../utils/auth/hashPassword/hashPassword");

const mockHashPassword = hashPassword as jest.Mocked<typeof hashPassword>;

describe("Given userCreator", () => {
  describe("When it's callend passing registration data", () => {
    test("Then it should replace the res.body with the created user object and call next with nothing", async () => {
      const req: any = {
        body: testUserRegistrationData,
      };

      (mockHashPassword as jest.Mock).mockResolvedValue(mockHashedPassword);

      const next = jest.fn();

      await createUser(req, null, next);

      expect(next).toHaveBeenCalledWith();
      expect(req.body).toEqual(expectedCreatedUser);
    });
  });

  describe("When it's callend and hashPasswqordBreaks", () => {
    test("Then it should call next with an error", async () => {
      const req: any = {
        body: testUserRegistrationData,
      };

      const error = new Error("Bruhv");

      (mockHashPassword as jest.Mock).mockRejectedValue(error);

      const next = jest.fn();

      await createUser(req, null, next);

      expect(next).toHaveBeenCalledWith(error);
    });
  });
});
