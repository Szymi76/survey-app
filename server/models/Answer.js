import mongoose from "mongoose";

const AnswerSchema = new mongoose.Schema({
  type: {
    type: String,
    required: true,
  },
  list: {
    type: [String],
    required: true,
  },
});

const Answer = mongoose.model("Answer", AnswerSchema);
export default Answer;
