import TokenPayload from "../../../../types/authTypes/TokenPayload";
import ResponseError from "../../../../types/errorTypes/ResponseError";

export const tokenPayload: TokenPayload = {
  accountId: "622f00e91e85099995d63b07",
  id: "622f00e91e85099995d63b06",
};

export const tokenResponse = {
  token: expect.any(String),
};

export const invalidTokenResponse: ResponseError = {
  error: true,
  code: 401,
  message: "Invalid token",
};
