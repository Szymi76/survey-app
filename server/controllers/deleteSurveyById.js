import Survey from "../models/Survey.js";

const deleteSurveyById = async (req, res) => {
  try {
    const { id } = req.user;
    const { surveyID } = req.params;

    if (!surveyID) return res.status(400).json({ message: "Survey id was not provided" });

    const survey = await Survey.findById(surveyID);
    if (!survey)
      return res.status(400).json({ message: "Survey with given id does not exists" });

    if (id !== survey.userID)
      return res.status(400).json({ message: "You are not a creator of this survey!" });
    await survey.remove();
    res.status(201).json({ message: "Survey was deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export default deleteSurveyById;
