import Answers from "../models/Answers.js";

const uploadAnswer = async (req, res) => {
  try {
    const { surveyID, list, answered_at } = req.body;

    const answers = new Answers({
      surveyID,
      list,
      answered_at,
    });

    await answers.save();
    res.status(201).json({ message: "Answer to survey was uploaded" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export default uploadAnswer;
