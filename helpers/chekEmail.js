import User from "../models/user.js";

const isDigit = async (number) => {
  return !isNaN(parseInt(number, 10));
  // return /\d/.test(number);
};

const addMentorOrStudentWithHelpOfEmail = async (email) => {
  console.log("email", email);
  const tempEmail = email;
  const number = tempEmail.split("@")[0];
  console.log("number", number);
  console.log("number", isDigit(number));
  return isDigit(number);
};
export default addMentorOrStudentWithHelpOfEmail;
