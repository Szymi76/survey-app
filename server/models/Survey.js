import mongoose from "mongoose";
import Question from "./Question.js";

const SurveySchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    min: 5,
    max: 26,
  },
  userID: {
    type: String,
    required: true,
  },
  questions: {
    type: [],
    required: true,
  },
  created_at: {
    type: Number,
    required: true,
  },
  active_from: {
    type: Number,
    required: true,
  },
  active_until: {
    type: Number,
    required: true,
  },
});

const Survey = mongoose.model("Survey", SurveySchema);
export default Survey;
