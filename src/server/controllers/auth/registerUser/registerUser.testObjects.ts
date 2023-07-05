import DatabaseUserData from "../../../../types/userTypes/DatabaseUserData";
import { CreatedUserData } from "../../../../types/userTypes/UserData";

export const successResponse = {
  message: "User registered sucessfully",
};

export const savingError = {
  message: "Sum error",
};

export const newUserTest: CreatedUserData = {
  information: {
    email: "testUserEmail@gmail.com",
    username: "testUser",
    firstName: "test",
    lastName: "user",
    phoneNumber: "256874123",
    picture: "https://something.com/picture/54257455.png",
  },
  credentials: {
    email: "testUserEmail@gmail.com",
    username: "testUser",
    password: "password",
  },
  isDisabled: false,
  resetPasswordOnLogin: false,
};

export const createdUserTest = {
  information: {
    email: "testUserEmail@gmail.com",
    username: "testUser",
    firstName: "test",
    lastName: "user",
    phoneNumber: "256874123",
    picture: "https://something.com/picture/54257455.png",
  },
  credentials: {
    email: "testUserEmail@gmail.com",
    username: "testUser",
    password: "password",
  },
  isDisabled: false,
  resetPasswordOnLogin: false,
  save: jest.fn(),
};

// export const expectedUserInformation = {
//   firstName: "Tesintg",
//   lastName: "User",
//   phoneNumber: "0000000000",
//   picture: "ayo.png",
// };

// export const accountUsers = {
//   accountId,
//   users: [
//     {
//       id: validUserId,
//       information: {
//         email: "testing@user.com",
//       },
//       credentials: {
//         email: "testing@user.com",
//       },
//       organizationData: {
//         group: "default",
//         roleId: "superuser",
//       },
//       toCompleteRegister: true,
//     },
//     {
//       id: registerCompleatedUserId,
//       information: {
//         email: "testing2@user.com",
//       },
//       credentials: {
//         email: "testing2@user.com",
//       },
//       organizationData: {
//         group: "default",
//         roleId: "superuser",
//       },
//       toCompleteRegister: false,
//     },
//   ],
//   save: jest.fn(),
// };
