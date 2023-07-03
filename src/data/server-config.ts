/* eslint-disable import/prefer-default-export */
// This file contains the basic configuration parameters of the server

// USER SETTINGS

// Session settings
export const userSessionDuration = "2h"; // Duration of the user session
export const userSessionRefresh = "1h"; // Time before the front should refresh the token

// Password settings
export const charactersOTP =
  "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
export const lengthOTP = 10;

export const saltRounds = 10;
