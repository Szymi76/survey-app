import mongoose from "mongoose";
import Answer from "./Answer.js";

const AnswersSchema = new mongoose.Schema({
  surveyID: {
    type: String,
    required: true,
  },
  list: {
    type: [],
    required: true,
  },
  answered_at: {
    type: Number,
    required: true,
  },
});

const Answers = mongoose.model("Answers", AnswersSchema);
export default Answers;
