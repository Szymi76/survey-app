import signToken from "../func/signToken.js";
import User from "../models/User.js";

const updateUserDisplayName = async (req, res) => {
  try {
    const { id } = req.user;
    const { displayName } = req.body;

    if (!id) return res.status(400).json({ message: "Id was not provided" });
    if (!displayName)
      return res.status(400).json({ message: "Display name was not provided" });

    const user = await User.findById(id);

    if (!user)
      return res.status(401).json({ message: "User with provided id does not exists" });

    user.displayName = displayName;

    await user.save();
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

export default updateUserDisplayName;
