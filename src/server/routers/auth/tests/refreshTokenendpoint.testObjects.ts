import TokenPayload from "../../../../types/authTypes/TokenPayload";
import ResponseError from "../../../../types/errorTypes/ResponseError";

export const tokenPayload: TokenPayload = {
  id: "622f00e91e85099995d63b06",
  tokenRefreshTime: 1,
};

export const tokenResponse = {
  token: expect.any(String),
};

export const invalidTokenResponse: ResponseError = {
  error: true,
  code: 401,
  message: "Invalid token",
};
