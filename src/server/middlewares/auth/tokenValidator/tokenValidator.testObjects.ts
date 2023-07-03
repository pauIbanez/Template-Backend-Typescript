import jwt from "jsonwebtoken";
import TokenPayload from "../../../../types/authTypes/TokenPayload";

export const tokenPayload: TokenPayload = {
  id: "622f00e91e85099995d63b06",
  tokenRefreshTime: 1,
};

export const getValidAuth = () => {
  const token = jwt.sign(tokenPayload, process.env.TOKEN_SECRET);
  return `Bearer ${token}`;
};

export const getInvalidAuth = () => {
  const token = jwt.sign(tokenPayload, "Other signer");
  return `Bearer ${token}`;
};
