import AccountCreationData from "../../../../types/accountTypes/accountCreationData";

export const validAccountCreationPayload: AccountCreationData = {
  accountName: "Testing account",
  superUserEmail: "testing@email.com",
};

export const invalidEmailAccountCreationPayload = {
  accountName: "Testing account",
  superUserEmail: "invalid email",
};

export const missingEmailAccountCreationPayload = {
  accountName: "Testing account",
};

export const expectedDetailsStringForInvalidEmail =
  '"superUserEmail" must be a valid email';

export const expectedDetailsStringForMissingEmail =
  '"superUserEmail" is required';
