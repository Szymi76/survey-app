import User from "../models/User.js";
import signToken from "../func/signToken.js";
import bcrypt from "bcrypt";

const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user)
      return res
        .status(404)
        .json({ message: "Użytkownik o podanym adresie email nie istnieje" });

    const compared = await bcrypt.compare(password, user.password);
    if (!compared)
      return res.status(401).json({ message: "Błędne hasło lub adres email" });

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
    res.status(500).json({ message: "Coś poszło nie tak" });
  }
};

export default login;
