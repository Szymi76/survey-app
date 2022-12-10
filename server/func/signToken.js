import jwt from "jsonwebtoken";

const signToken = (id) => {
  const token = jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: 30 * 60 }); // CZAS WAŻNOŚCI TOKENA -- 30MIN
  return token;
};

export default signToken;
