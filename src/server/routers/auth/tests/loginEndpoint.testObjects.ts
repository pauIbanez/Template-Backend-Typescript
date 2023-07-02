import LoginData from "../../../../types/authTypes/loginData";
import ResponseError from "../../../../types/errorTypes/ResponseError";
import hashPassword from "../../../utils/auth/hashPassword/hashPassword";

export const missingUserLoginData: LoginData = {
  email: "missing@email.com",
  password: "password1234",
};

export const normalUserLoginData: LoginData = {
  email: "normal@email.com",
  password: "password1234",
};

export const invalidPasswordLoginData: LoginData = {
  email: "normal@email.com",
  password: "invalidPassword",
};

export const otpUserLoginData: LoginData = {
  email: "otp@email.com",
  password: "password1234",
  withOtp: true,
};

export const disabledUserLoginData: LoginData = {
  email: "disabled@email.com",
  password: "password1234",
};

export const noPasswordLoginData: LoginData = {
  email: "nopassword@email.com",
  password: "password1234",
};

export const genericLoginError: ResponseError = {
  error: true,
  code: 401,
  message: "Incorrect email or password",
};

export const disabledUserError: ResponseError = {
  error: true,
  code: 401,
  message: "This user is currently disabled",
};

export const getTestUsers = async (): Promise<any> => [
  {
    information: {
      firstName: "test",
      lastName: "user",
      email: normalUserLoginData.email,
    },

    credentials: {
      email: normalUserLoginData.email,
      password: await hashPassword(normalUserLoginData.password),
    },
  },
  {
    information: {
      firstName: "test",
      lastName: "user",
      email: otpUserLoginData.email,
    },

    credentials: {
      email: otpUserLoginData.email,
      otpPassword: await hashPassword(otpUserLoginData.password),
    },
    save: jest.fn(),
  },
  {
    information: {
      firstName: "test",
      lastName: "user",
      email: noPasswordLoginData.email,
    },

    credentials: {
      email: noPasswordLoginData.email,
    },
  },
  {
    information: {
      firstName: "test",
      lastName: "user",
      email: disabledUserLoginData.email,
    },

    credentials: {
      email: disabledUserLoginData.email,
      password: disabledUserLoginData.password,
    },
    isDisabled: true,
  },
];
