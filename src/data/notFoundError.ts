/* eslint-disable import/prefer-default-export */

export const getNotFoundError = () => ({
  error: true,
  code: 404,
  message: "Resource not found",
});
