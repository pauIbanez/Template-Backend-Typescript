import { getUserNotFoundError } from "../../../../data/errorObjects/userErrors";
import Users from "../../../../database/models/Users";

import registerUser from "./registerUser";
import {
  createdUserTest,
  newUserTest,
  savingError,
  successResponse,
} from "./registerUser.testObjects";

jest.mock("../../../../database/models/Users");

const mockSendEmail = jest.fn();

jest.mock("../../../utils/email", () => () => mockSendEmail);

beforeEach(() => {
  jest.resetAllMocks();
});

describe("Given registerUser", () => {
  describe("When it's called and eveything is ok", () => {
    test("Then it should call Users.create with the createdUser and call res.json with a success message", async () => {
      const req: any = {
        body: newUserTest,
      };

      const res: any = {
        json: jest.fn(),
      };

      const next = jest.fn();

      mockSendEmail.mockResolvedValue(null);
      Users.create = jest.fn().mockResolvedValue(createdUserTest);

      await registerUser(req, res, next);

      expect(mockSendEmail).toHaveBeenCalled();
      expect(next).not.toHaveBeenCalled();
      expect(Users.create).toHaveBeenCalledWith(newUserTest);
      expect(res.json).toHaveBeenCalledWith(successResponse);
    });
  });

  //   describe("When it's called and the user is not found", () => {
  //     test("Then it should call next with an error", async () => {
  //       const expectedError = getUserNotFoundError(accountId, missingUserId);

  //       const req: any = {
  //         body: registrationData,
  //       };

  //       const res: any = {
  //         json: jest.fn(),
  //         locals: {
  //           accountId,
  //           userId: missingUserId,
  //           accountUsers,
  //         },
  //       };

  //       const next = jest.fn();

  //       await registerUser(req, res, next);

  //       expect(next).toHaveBeenCalledWith(expectedError);
  //       expect(res.json).not.toHaveBeenCalled();
  //     });
  //   });

  //   describe("When it's called and the accountUsers saving fails", () => {
  //     test("Then it should call next with an error", async () => {
  //       const expectedError = getSavingAccountUsersError(
  //         accountId,
  //         savingError.message
  //       );

  //       const req: any = {
  //         body: registrationData,
  //       };

  //       const modifiableAccountUsers = getModifiableAccountUsers();

  //       const res: any = {
  //         json: jest.fn(),
  //         locals: {
  //           accountId,
  //           userId: validUserId,
  //           accountUsers: modifiableAccountUsers,
  //         },
  //       };

  //       const next = jest.fn();
  //       modifiableAccountUsers.save.mockImplementation(() => {
  //         throw savingError;
  //       });

  //       await registerUser(req, res, next);

  //       expect(next).toHaveBeenCalledWith(expectedError);
  //       expect(res.json).not.toHaveBeenCalled();
  //     });
  //   });
});
