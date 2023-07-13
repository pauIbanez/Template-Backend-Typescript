import hashPassword from "../../../utils/auth/hashPassword/hashPassword";
import createUser from "./userCreator";
import {
  expectedCreatedUser,
  expectedLocals,
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
      const res: any = {
        locals: {},
      };

      (mockHashPassword as jest.Mock).mockResolvedValue(mockHashedPassword);

      const next = jest.fn();

      await createUser(req, res, next);

      expect(next).toHaveBeenCalledWith();
      expect(req.body).toEqual(expectedCreatedUser);
      expect(res.locals).toEqual(expectedLocals);
    });
    test("This it should put the email and username in res.locals with goNext set to true", async () => {
      const req: any = {
        body: testUserRegistrationData,
      };
      const res: any = {
        locals: {},
      };

      (mockHashPassword as jest.Mock).mockResolvedValue(mockHashedPassword);

      const next = jest.fn();

      await createUser(req, res, next);

      expect(res.locals).toEqual(expectedLocals);
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
