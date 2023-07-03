// This is a type for the user you want to manage internally, independent of the database schema
interface UserData {
  id?: string;
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
}
export default UserData;
