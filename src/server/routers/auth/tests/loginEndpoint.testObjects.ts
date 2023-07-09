import bcrypt from "bcrypt";
import LoginData from "../../../../types/authTypes/loginData";
import ResponseError from "../../../../types/errorTypes/ResponseError";

const validUserUsername = "testuser";
const invalidUserUsername = "bruh";

const validUserEmail = "testing@email.com";
const otpUserEmail = "otpuser@email.com";
const disabledUserEmail = "disabled@email.com";
const missingUserEmail = "missing@email.com";
const noPasswordUserEmail = "nopassword@email.com";
const notActiveUserEmail = "notActive@email.com";

const validPassword = "1234";
const invalidPassword = "1nv4l1dP455w0rd1r0n1c4ll9MuchM0r353cur3";

const hashSalt = bcrypt.genSaltSync(10);
const validHashedPassword = bcrypt.hashSync(validPassword, hashSalt);

export const loginData: LoginData = {
  email: validUserEmail,
  password: validPassword,
};

export const usernameLoginData: LoginData = {
  email: validUserUsername,
  password: validPassword,
};

export const invalidUsernameLoginData: LoginData = {
  email: invalidUserUsername,
  password: validPassword,
};

export const loginDataWithOtp: LoginData = {
  email: otpUserEmail,
  password: validPassword,
  withOtp: true,
};

export const invalidPasswordLoginData: LoginData = {
  email: validUserEmail,
  password: invalidPassword,
};

export const invalidOtpPasswordLoginData: LoginData = {
  email: validUserEmail,
  password: invalidPassword,
  withOtp: true,
};

export const noNormalPasswordLoginData: LoginData = {
  email: noPasswordUserEmail,
  password: "1234",
};

export const noOtpPasswordLoginData: LoginData = {
  email: noPasswordUserEmail,
  password: "1234",
  withOtp: true,
};

export const disabledUserLoginData: LoginData = {
  email: disabledUserEmail,
  password: invalidPassword,
};

export const missingUserLoginData: LoginData = {
  email: missingUserEmail,
  password: validPassword,
};

export const notActiveUserLoginData: LoginData = {
  email: notActiveUserEmail,
  password: validPassword,
};

export const expectedGenericLoginError: ResponseError = {
  error: true,
  code: 401,
  message: "Incorrect email or password",
};

export const expectedDisabledUserError: ResponseError = {
  error: true,
  code: 403,
  message: "This user is currently disabled",
};

export const expectedNotActiveUserError: ResponseError = {
  error: true,
  code: 403,
  message: "This user is not activated yet!",
};

export const getTestUsers = () => [
  {
    information: {
      firstName: "test",
      lastName: "user",
      email: validUserEmail,
      username: validUserUsername,
    },

    credentials: {
      email: validUserEmail,
      password: validHashedPassword,
      username: validUserUsername,
    },
  },
  {
    information: {
      firstName: "test",
      lastName: "user",
      email: otpUserEmail,
      username: "notimportant",
    },

    credentials: {
      email: otpUserEmail,
      otpPassword: validHashedPassword,
      username: "notimportant",
    },
  },
  {
    information: {
      firstName: "test",
      lastName: "user",
      email: noPasswordUserEmail,
      username: "notimportant",
    },

    credentials: {
      email: noPasswordUserEmail,
      username: "notimportant",
    },
  },
  {
    information: {
      firstName: "test",
      lastName: "user",
      email: disabledUserEmail,
      username: "notimportant",
    },

    credentials: {
      email: disabledUserEmail,
      password: validHashedPassword,
      username: "notimportant",
    },
    isDisabled: true,
  },
  {
    information: {
      firstName: "test",
      lastName: "user",
      email: notActiveUserEmail,
      username: "notimportant",
    },

    credentials: {
      email: notActiveUserEmail,
      password: validHashedPassword,
      username: "notimportant",
    },
    isDisabled: false,
    verificationToken: "ayooo",
  },
];
