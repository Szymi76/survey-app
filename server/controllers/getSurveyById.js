import Survey from "../models/Survey.js";

const getSurveyById = async (req, res) => {
  try {
    const { surveyID } = req.params;
    if (!surveyID) return res.status(400).json({ message: "Survey id was not provided" });

    const survey = await Survey.findById(surveyID);
    if (!survey) return res.status(404).json({ message: "Survey does not exists" });

    res.status(200).json(survey);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export default getSurveyById;
