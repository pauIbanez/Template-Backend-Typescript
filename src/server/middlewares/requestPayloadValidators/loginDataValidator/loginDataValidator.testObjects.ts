import LoginData from "../../../../types/authTypes/loginData";

export const accountId = "622f00e91e85099995d63b07";

export const validLoginPayload: LoginData = {
  accountId,
  email: "testing@email.com",
  password: "12345Aa",
};

export const invalidLoginPayload = {
  accountId,
  email: "invalid email",
  password: "12345Aa",
};

export const missingAccountIdLoginPayload = {
  email: "testing@email.com",
  password: "12345Aa",
};

export const invalidLoginDetailsString = '"email" must be a valid email';
export const missingAccountIdDetailsString = '"accountId" is required';
