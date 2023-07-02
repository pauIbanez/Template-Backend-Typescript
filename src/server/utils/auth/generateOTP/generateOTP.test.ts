import generateOTP from "./generateOTP";
import { expectedOTPLength } from "./generateOTP.testObjects";

describe("Given generateOTP", () => {
  describe("When it's called", () => {
    test("It should return a string with a length of 10", () => {
      const receivedOTP = generateOTP();

      expect(receivedOTP.length).toBe(expectedOTPLength);
    });
  });
});
