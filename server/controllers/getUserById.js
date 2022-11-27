import User from "../models/User.js";
import signToken from "../func/signToken.js";

const getUserById = async (req, res) => {
  try {
    const { id } = req.user;
    if (!id) return res.status(400).json({ message: "Id was not provided" });

    const user = await User.findById(id);
    if (!user)
      return res.status(401).json({ message: "User with provided id does not exists" });

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

export default getUserById;
