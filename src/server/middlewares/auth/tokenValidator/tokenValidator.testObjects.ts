import jwt from "jsonwebtoken";
import TokenPayload from "../../../../types/authTypes/TokenPayload";

export const tokenPayload: TokenPayload = {
  accountId: "622f00e91e85099995d63b07",
  id: "622f00e91e85099995d63b06",
};

export const getValidAuth = () => {
  const token = jwt.sign(tokenPayload, process.env.TOKEN_SECRET);
  return `Bearer ${token}`;
};

export const getInvalidAuth = () => {
  const token = jwt.sign(tokenPayload, "Other signer");
  return `Bearer ${token}`;
};
