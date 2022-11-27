import jwt from "jsonwebtoken";

const signToken = id => {
  const token = jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: 180 });
  return token;
};

export default signToken;
