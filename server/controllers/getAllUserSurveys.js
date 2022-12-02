import mongoose from "mongoose";
import Survey from "../models/Survey.js";

const getAllUserSurveys = async (req, res) => {
  try {
    const { id } = req.user;
    const objID = mongoose.Types.ObjectId(id);
    const surveys = await Survey.find({ userID: objID });
    res.status(200).json(surveys);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export default getAllUserSurveys;
