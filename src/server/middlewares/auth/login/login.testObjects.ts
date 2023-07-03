import bcrypt from "bcrypt";
import LoginData from "../../../../types/authTypes/loginData";

const hashSalt = bcrypt.genSaltSync(10);

export const tokenResponse = {
  token: expect.any(String),
};

export const nativeError = {
  message: "Something broke",
};

export const disabledUserId = "622f00e91e85099995d63b04";
export const validUserId = "622f00e91e85099995d63b03";
export const noPasswordUserId = "622f00e91e85099995d63b02";

const validUserEmail = "testing@email.com";
const disabledUserEmail = "disabled@email.com";
export const missingUserEmail = "missing@email.com";
const noPasswordUserEmail = "nopassword@email.com";

const validPassword = "1234";
const invalidPassword = "1nv4l1dP455w0rd1r0n1c4ll9MuchM0r353cur3";

export const validHashedPassword = bcrypt.hashSync(validPassword, hashSalt);
export const invalidHashedPasword = bcrypt.hashSync(invalidPassword, hashSalt);

export const loginData: LoginData = {
  email: validUserEmail,
  password: validPassword,
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

export const noNoNormalPasswordLoginData: LoginData = {
  email: noPasswordUserEmail,
  password: "1234",
};

export const noNoOtpPasswordLoginData: LoginData = {
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

export const loginDataWithOtp: LoginData = {
  email: validUserEmail,
  password: validPassword,
  withOtp: true,
};
export const getTestUsers = () => ({
  normalUser: {
    information: {
      firstName: "test",
      lastName: "user",
      email: validUserEmail,
    },

    credentials: {
      email: validUserEmail,
      password: validHashedPassword,
    },
  },
  otpUser: {
    information: {
      firstName: "test",
      lastName: "user",
      email: validUserEmail,
    },

    credentials: {
      email: validUserEmail,
      otpPassword: validHashedPassword,
    },
    save: jest.fn(),
  },
  noPasswordUser: {
    information: {
      firstName: "test",
      lastName: "user",
      email: validUserEmail,
    },

    credentials: {
      email: validUserEmail,
    },
  },
  disabledUser: {
    information: {
      firstName: "test",
      lastName: "user",
      email: disabledUserEmail,
    },

    credentials: {
      email: disabledUserEmail,
      password: validHashedPassword,
    },
    isDisabled: true,
  },
});
