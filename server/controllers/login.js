import User from "../models/User.js";
import signToken from "../func/signToken.js";
import bcrypt from "bcrypt";

const login = async (req, res) => {
  try {
    console.log("1");
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ message: "User does not exists" });

    const compared = await bcrypt.compare(password, user.password);
    if (!compared) return res.status(401).json({ messgae: "Password does not match" });

    const token = signToken(user._id);

    const result = {
      id: user._id,
      displayName: user.displayName,
      email: user.email,
      emailVerified: user.emailVerified,
      photoURL: user.photoURL,
      token,
    };

    res.status(200).json(result);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export default login;
