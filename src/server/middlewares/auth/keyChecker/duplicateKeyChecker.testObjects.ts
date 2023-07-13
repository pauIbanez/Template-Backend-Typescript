import ControledError from "../../../../data/errorObjects/ControledError";
import { ErrorSeverety } from "../../../../types/errorTypes/ServerError";

export const repeatedEmail = "repeat@email.com";
export const repeatedUsername = "repeatUsername";

export const correctLocalsGoNext = {
  email: "someEmail@email.com",
  username: "username",
  goNext: true,
};

export const correctLocals = {
  email: "someEmail@email.com",
  username: "username",
  goNext: false,
};

export const repeatEmailLocals = {
  email: repeatedEmail,
  username: "username",
  goNext: false,
};

export const repeatUsernameLocals = {
  email: "someEmail@email.com",
  username: repeatedUsername,
  goNext: false,
};

export const correctKeysOnlyUsername = {
  username: "asadasda",
  goNext: false,
};

export const correctKeysOnlyEmail = {
  email: "asdasdas@email.com",
  goNext: false,
};

export const repeatUsernameAndEmailLocals = {
  email: repeatedEmail,
  username: repeatedUsername,
  goNext: false,
};

export const getQueryFromLocals = ({
  email,
  username,
}: {
  email?: string;
  username?: string;
}) => ({
  $or: [
    { "information.email": email || "" },
    { "information.username": username || "" },
  ],
});

export const getTestUsers = () => [
  {
    information: {
      firstName: "test",
      lastName: "user",
      email: repeatedEmail,
      username: "testusers",
      picture: "asd",
    },
  },
  {
    information: {
      firstName: "test",
      lastName: "user",
      email: "email@email.com",
      username: repeatedUsername,
      picture: "asd",
    },
  },
];

export const expectedResponse = {
  message: "No conflicts",
};

export const expectedDuplicateEmailError: ControledError = new ControledError({
  name: "DUPLICATEKEY",
  message: "Duplicate key/s: Email",
  severety: ErrorSeverety.low,
  statusCode: 409,
  messageToSend: "Duplicated keys: Email",
  extraData: {
    keys: ["Email"],
  },
});

export const expectedDuplicateUsernameError: ControledError =
  new ControledError({
    name: "DUPLICATEKEY",
    message: "Duplicate key/s: Username",
    severety: ErrorSeverety.low,
    statusCode: 409,
    messageToSend: "Duplicated keys: Username",
    extraData: {
      keys: ["Username"],
    },
  });
export const expectedDuplicateEmailAndUsernameError: ControledError =
  new ControledError({
    name: "DUPLICATEKEY",
    message: "Duplicate key/s: Email, Username",
    severety: ErrorSeverety.low,
    statusCode: 409,
    messageToSend: "Duplicated keys: Email, Username",
    extraData: {
      keys: expect.arrayContaining(["Username", "Email"]),
    },
  });

export const thrownError = new Error("something bad");
