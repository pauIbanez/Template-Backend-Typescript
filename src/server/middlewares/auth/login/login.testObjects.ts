import bcrypt from "bcrypt";
import LoginData from "../../../../types/authTypes/loginData";

export const normalUserId = "622f00e91e85099995d63b01";
export const disabledUserId = "622f00e91e85099995d63b02";
export const noPasswordUserId = "622f00e91e85099995d63b04";
export const notActiveUserId = "622f00e91e85099995d63b05";

const validUserEmail = "testing@email.com";
const disabledUserEmail = "disabled@email.com";
export const missingUserEmail = "missing@email.com";
const noPasswordUserEmail = "nopassword@email.com";
const notActiveUserEmail = "notActive@email.com";

const validPassword = "1234";
const invalidPassword = "1nv4l1dP455w0rd1r0n1c4ll9MuchM0r353cur3";

const hashSalt = bcrypt.genSaltSync(10);
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

export const notActiveUserLoginData: LoginData = {
  email: notActiveUserEmail,
  password: validPassword,
};

export const getTestUsers = () => ({
  normalUser: {
    id: normalUserId,
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
    id: normalUserId,
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
    id: noPasswordUserId,
    information: {
      firstName: "test",
      lastName: "user",
      email: noPasswordUserEmail,
    },

    credentials: {
      email: noPasswordUserEmail,
    },
  },
  disabledUser: {
    id: disabledUserId,
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
  notActiveUser: {
    id: notActiveUserId,
    information: {
      firstName: "test",
      lastName: "user",
      email: notActiveUserEmail,
    },

    credentials: {
      email: notActiveUserEmail,
      password: validHashedPassword,
    },
    isDisabled: false,
    verificationToken: "ayooo",
  },
});
