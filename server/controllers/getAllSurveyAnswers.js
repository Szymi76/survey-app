import Answers from "../models/Answers.js";
import Survey from "../models/Survey.js";

const getAllSurveyAnswers = async (req, res) => {
  try {
    const { id } = req.user;
    const { surveyID } = req.params;
    if (!surveyID) return res.status(400).json({ message: "Survey id was not provided" });

    const survey = await Survey.findById(surveyID);
    if (id !== survey.userID)
      return res.status(401).json({ message: "You are not creator of that survey" });

    const allAnswers = await Answers.find({ surveyID });
    if (!allAnswers)
      return res.status(404).json({ message: "Survey with provided id does not exists" });

    res.status(200).json(allAnswers);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export default getAllSurveyAnswers;
