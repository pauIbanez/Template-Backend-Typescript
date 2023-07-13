import ControledError from "../../../../data/errorObjects/ControledError";
import { ErrorSeverety } from "../../../../types/errorTypes/ServerError";

export const myUserTestId = "64afdf0aed1013ef00aed663";
export const missingOtherUserTestId = "64afdf0aed1013ef00aed665";

export const foundTestUser = {
  information: {
    firstName: "mytest",
    lastName: "user2",
    username: "mytestuser",
    email: "mytestuser@email.com",
    picture: "asdas",
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
    userId: missingOtherUserTestId,
  },
});

export const thrownError = new Error("something broke myUser");
