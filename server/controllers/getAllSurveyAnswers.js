import Answers from "../models/Answers.js";

const getAllSurveyAnswers = async (req, res) => {
  try {
    const { surveyID } = req.params;
    if (!surveyID) return res.status(400).json({ message: "Survey id was not provided" });

    const allAnswers = await Answers.find({ surveyID });
    if (!allAnswers)
      return res.status(404).json({ message: "Survey with provided id does not exists" });

    res.status(200).json(allAnswers);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export default getAllSurveyAnswers;
