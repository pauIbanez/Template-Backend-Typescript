import bcrypt from "bcrypt";

const hashPassword = async (unhashedPassword: string): Promise<string> => {
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(unhashedPassword, salt);

  return hashedPassword;
};

export default hashPassword;
