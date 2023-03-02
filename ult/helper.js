import bcrypt from "bcrypt";
const saltRounds = 10;

export function encryptPassword(password) {
  const salt = bcrypt.genSaltSync(saltRounds);
  const hash = bcrypt.hashSync(password, salt);
  return hash;
}

export function AuthAuthor(enterdEmail, authorPassword, dbEmail, editor) {
  if (enterdEmail != dbEmail || editor == null) {
    return { isAuth: false, message: "Email not match" };
  } else {
    if (editor) {
      let temp = bcrypt.compareSync(authorPassword, editor.Password); // true
      if (temp) {
        return { isAuth: true, message: "all good" };
      } else {
        return { isAuth: false, message: "wrong password" };
      }
    } else {
      return { isAuth: false, message: "no email" };
    }
  }
}
