import {
  getSavingAccountUsersError,
  getUserAlreadyRegisteredError,
  getUserNotFoundError,
} from "../../../../data/errorObjects/userErrors";
import registerUser from "./registerUser";
import {
  accountId,
  accountUsers,
  expectedUserInformation,
  getModifiableAccountUsers,
  missingUserId,
  registerCompleatedUserId,
  registrationData,
  savingError,
  successResponse,
  validUserId,
} from "./registerUser.testObjects";

describe("Given registerUser", () => {
  describe("When it's called and eveything is ok", () => {
    test("Then it should call res.json with a success message and put the request data to the user", async () => {
      const req: any = {
        body: registrationData,
      };

      const modifiableAccountUsers = getModifiableAccountUsers();
      const user = modifiableAccountUsers.users[0];

      const res: any = {
        json: jest.fn(),
        locals: {
          accountId,
          userId: validUserId,
          accountUsers: modifiableAccountUsers,
        },
      };

      const next = jest.fn();

      await registerUser(req, res, next);

      expect(next).not.toHaveBeenCalled();
      expect(res.json).toHaveBeenCalledWith(successResponse);
      expect(user.information).toMatchObject(expectedUserInformation);
      expect(user.toCompleteRegister).toBe(false);
      expect((user.credentials as any).password).toBeTruthy();
    });
  });

  describe("When it's called and the user is already registered", () => {
    test("Then it should call next with an error", async () => {
      const expectedError = getUserAlreadyRegisteredError(
        accountId,
        registerCompleatedUserId
      );

      const req: any = {
        body: registrationData,
      };

      const res: any = {
        json: jest.fn(),
        locals: {
          accountId,
          userId: registerCompleatedUserId,
          accountUsers,
        },
      };

      const next = jest.fn();

      await registerUser(req, res, next);

      expect(next).toHaveBeenCalledWith(expectedError);
      expect(res.json).not.toHaveBeenCalled();
    });
  });

  describe("When it's called and the user is not found", () => {
    test("Then it should call next with an error", async () => {
      const expectedError = getUserNotFoundError(accountId, missingUserId);

      const req: any = {
        body: registrationData,
      };

      const res: any = {
        json: jest.fn(),
        locals: {
          accountId,
          userId: missingUserId,
          accountUsers,
        },
      };

      const next = jest.fn();

      await registerUser(req, res, next);

      expect(next).toHaveBeenCalledWith(expectedError);
      expect(res.json).not.toHaveBeenCalled();
    });
  });

  describe("When it's called and the accountUsers saving fails", () => {
    test("Then it should call next with an error", async () => {
      const expectedError = getSavingAccountUsersError(
        accountId,
        savingError.message
      );

      const req: any = {
        body: registrationData,
      };

      const modifiableAccountUsers = getModifiableAccountUsers();

      const res: any = {
        json: jest.fn(),
        locals: {
          accountId,
          userId: validUserId,
          accountUsers: modifiableAccountUsers,
        },
      };

      const next = jest.fn();
      modifiableAccountUsers.save.mockImplementation(() => {
        throw savingError;
      });

      await registerUser(req, res, next);

      expect(next).toHaveBeenCalledWith(expectedError);
      expect(res.json).not.toHaveBeenCalled();
    });
  });
});
