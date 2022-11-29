import jwt from "jsonwebtoken";

const signToken = id => {
  const token = jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: 5 * 60 }); // CZAS WAŻNOŚCI TOKENA -- 5MIN
  return token;
};

export default signToken;
