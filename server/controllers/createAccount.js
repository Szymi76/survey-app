import User from "../models/User.js";
import bcrypt from "bcrypt";
import signToken from "../func/signToken.js";

const DEFAULT_PHOTO_URL = "https://img.freepik.com/free-icon/user_318-804790.jpg";

const createAccount = async (req, res) => {
  try {
    const { displayName, email, password } = req.body;
    const foundUser = await User.findOne({ email });
    if (foundUser)
      return res
        .status(403)
        .json({ message: "Użytkownik z takim adresem email już istnieje" });

    const salt = await bcrypt.genSalt();
    const hashPassword = await bcrypt.hash(password, salt);

    const newUser = new User({
      email,
      password: hashPassword,
      emailVerified: false,
      displayName,
      photoURL: DEFAULT_PHOTO_URL,
    });

    const user = await newUser.save();
    const token = signToken(user._id);

    const result = {
      id: user._id,
      displayName: user.displayName,
      email: user.email,
      emailVerified: user.emailVerified,
      photoURL: user.photoURL,
      token,
    };

    res.status(201).json(result);
  } catch (err) {
    res.status(500).json({ message: "Coś poszło nie tak" });
  }
};

export default createAccount;
