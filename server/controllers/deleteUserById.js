import User from "../models/User.js";

const deleteUserById = async (req, res) => {
  try {
    const { id } = req.user;
    if (!id) return res.status(400).json({ message: "Id was not provided" });

    await User.findByIdAndRemove(id);

    res.status(202).json({ message: "User was deleted successully" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export default deleteUserById;
