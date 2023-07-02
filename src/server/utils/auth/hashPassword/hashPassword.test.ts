import bcrypt from "bcrypt";
import hashPassword from "./hashPassword";
import { hashedPassword, unhashedPassword } from "./hashPassword.testObjects";

describe("Given hashPassword", () => {
  describe("When called with a plain text password", () => {
    test("It should return the password as hashed", async () => {
      jest.spyOn(bcrypt, "hash").mockImplementation(async () => hashedPassword);

      const receivedPassword = await hashPassword(unhashedPassword);

      expect(receivedPassword).toBe(hashedPassword);
    });
  });
});
