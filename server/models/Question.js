import mongoose from "mongoose";

const QuestionSchema = new mongoose.Schema({
  label: {
    type: String,
    required: true,
    min: 5,
    max: 26,
  },
  type: {
    type: String,
    required: true,
  },
  list: {
    type: [String],
    required: true,
  },
  limit: {
    type: Number,
    required: true,
    min: 2,
  },
  required: {
    type: Boolean,
    required: true,
  },
  placeholder: {
    type: String,
    required: true,
  },
});

const Question = mongoose.model("Question", QuestionSchema);
export default Question;
