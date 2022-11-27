import Survey from "../models/Survey.js";

const uploadSurvey = async (req, res) => {
  try {
    const { title, userID, questions, created_at, active_from, active_until } = req.body;

    const survey = new Survey({
      title,
      userID,
      questions,
      created_at,
      active_from,
      active_until,
    });

    await survey.save();
    res.status(201).json({ message: "Survey was uploaded" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export default uploadSurvey;
