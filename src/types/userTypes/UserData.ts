interface UserData {
  id?: string;
  _id?: string;
  information: {
    firstName: string;
    lastName: string;
    email: string;
    phoneNumber: string;
    picture: string;
  };

  isDisabled: boolean;
  resetPasswordOnLogin: boolean;
  toCompleteRegister: boolean;

  organizationData: {
    group: string;
    roleId: string;
  };
}
export default UserData;
