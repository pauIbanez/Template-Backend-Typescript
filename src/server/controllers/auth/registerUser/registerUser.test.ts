import Users from "../../../../database/models/Users";
import sendEmail from "../../../utils/email";

import registerUser from "./registerUser";
import {
  createdUserTest,
  expectedMailData,
  newUserTest,
  successResponse,
} from "./registerUser.testObjects";

jest.mock("../../../../database/models/Users");
jest.mock("../../../utils/email");

const mockSendEmail = sendEmail as jest.Mocked<typeof sendEmail>;

let modifiableCreatedUser: any;

beforeEach(() => {
  jest.resetAllMocks();

  modifiableCreatedUser = { ...createdUserTest };
});

describe("Given registerUser", () => {
  describe("When it's called and eveything is ok", () => {
    test("Then it should call Users.create with the createdUser and call res.json with a success message", async () => {
      const req: any = {
        body: newUserTest,
      };

      const res: any = {
        json: jest.fn(),
        status: jest.fn().mockReturnThis(),
      };

      (mockSendEmail as jest.Mock).mockResolvedValue(null);

      const next = jest.fn();
      Users.create = jest.fn().mockResolvedValue(modifiableCreatedUser);

      await registerUser(req, res, next);

      expect(mockSendEmail).toHaveBeenCalled();
      expect(next).not.toHaveBeenCalled();
      expect(Users.create).toHaveBeenCalledWith(newUserTest);
      expect(res.json).toHaveBeenCalledWith(successResponse);
    });

    test("Then it should create the correct MailData and call sendEmail with it", async () => {
      const req: any = {
        body: newUserTest,
      };

      const res: any = {
        json: jest.fn(),
        status: jest.fn().mockReturnThis(),
      };

      (mockSendEmail as jest.Mock).mockResolvedValue(null);

      Users.create = jest.fn().mockResolvedValue(modifiableCreatedUser);

      await registerUser(req, res, null);

      expect(mockSendEmail).toHaveBeenCalledWith(expectedMailData);
    });

    test("Then it should create a verification token, put it in the created user and call save", async () => {
      const req: any = {
        body: newUserTest,
      };

      const res: any = {
        json: jest.fn(),
        status: jest.fn().mockReturnThis(),
      };

      (mockSendEmail as jest.Mock).mockResolvedValue(null);

      Users.create = jest.fn().mockResolvedValue(modifiableCreatedUser);

      await registerUser(req, res, null);

      expect((modifiableCreatedUser as any).verificationToken).toBeTruthy();
      expect(createdUserTest.save).toHaveBeenCalled();
    });
  });

  describe("When it's called and the user fails to create", () => {
    test("Then it should call next and not anything else", async () => {
      const req: any = {
        body: newUserTest,
      };

      const res: any = {
        json: jest.fn(),
      };

      (mockSendEmail as jest.Mock).mockResolvedValue(null);

      const next = jest.fn();
      Users.create = jest.fn().mockRejectedValue(null);

      await registerUser(req, res, next);

      expect(Users.create).toHaveBeenCalledWith(newUserTest);
      expect(mockSendEmail).not.toHaveBeenCalled();
      expect(next).toHaveBeenCalled();
      expect(res.json).not.toHaveBeenCalled();
    });
  });

  describe("When it's called and the mail fails to be sent", () => {
    test("Then it should still call res.json and not next", async () => {
      const req: any = {
        body: newUserTest,
      };

      const res: any = {
        json: jest.fn(),
      };

      (mockSendEmail as jest.Mock).mockRejectedValue(null);

      const next = jest.fn();
      Users.create = jest.fn().mockResolvedValue(modifiableCreatedUser);

      await registerUser(req, res, next);

      expect(Users.create).toHaveBeenCalledWith(newUserTest);
      expect(mockSendEmail).toHaveBeenCalled();
      expect(next).not.toHaveBeenCalled();
      expect(res.json).toHaveBeenCalledWith(successResponse);
    });
  });
});
