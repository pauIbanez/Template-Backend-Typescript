import RegistrationData from "../../../../types/userTypes/RegistrationData";

export const accountId = "622f00e91e85099995d63b07";
export const validUserId = "622f00e91e85099995d63b06";
export const missingUserId = "622f00e91e85099995d63b05";
export const registerCompleatedUserId = "622f00e91e85099995d63b04";

export const successResponse = {
  message: "User registered sucessfully",
};

export const savingError = {
  message: "Sum error",
};

export const registrationData: RegistrationData = {
  firstName: "Tesintg",
  lastName: "User",
  password: "1234",
  phoneNumber: "0000000000",
  picture: "ayo.png",
};

export const expectedUserInformation = {
  firstName: "Tesintg",
  lastName: "User",
  phoneNumber: "0000000000",
  picture: "ayo.png",
};

export const accountUsers = {
  accountId,
  users: [
    {
      id: validUserId,
      information: {
        email: "testing@user.com",
      },
      credentials: {
        email: "testing@user.com",
      },
      organizationData: {
        group: "default",
        roleId: "superuser",
      },
      toCompleteRegister: true,
    },
    {
      id: registerCompleatedUserId,
      information: {
        email: "testing2@user.com",
      },
      credentials: {
        email: "testing2@user.com",
      },
      organizationData: {
        group: "default",
        roleId: "superuser",
      },
      toCompleteRegister: false,
    },
  ],
  save: jest.fn(),
};

export const getModifiableAccountUsers = () => ({
  ...accountUsers,
  ...JSON.parse(JSON.stringify(accountUsers)),
});
