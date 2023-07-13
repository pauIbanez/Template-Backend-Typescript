import ControledError from "../../../../data/errorObjects/ControledError";
import { ErrorSeverety } from "../../../../types/errorTypes/ServerError";

export const myUserTestId = "64afdf0aed1013ef00aed663";
export const missingUserTestId = "64afdf0aed1013ef00aed664";

export const foundTestUser = {
  information: {
    firstName: "test",
    lastName: "user",
    username: "testUser2",
    email: "testUser2@email.com",
    picture: "bruhg",
  },
  id: myUserTestId,
};

export const expectedError = new ControledError({
  name: "MISSINGUSER",
  message: "User not found for Id",
  statusCode: 404,
  messageToSend: "User not found",
  severety: ErrorSeverety.low,
  extraData: {
    userId: missingUserTestId,
  },
});

export const thrownError = new Error("something broke");
