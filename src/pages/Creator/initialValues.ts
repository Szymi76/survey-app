import { Question, Survey, qnTypes } from "../../types/Survey";

const initialQuestion: Question = {
  label: "Jakie cechy się do ciebie odnoszą?",
  list: ["Pomocny", "Zazdrosny", "Niecierpliwy"],
  type: qnTypes.MULTI,
  limit: 2,
  placeholder: "",
  required: true,
};

const initialSurvey: Survey = {
  title: "Twój tytuł ankiety",
  userID: "",
  questions: [initialQuestion],
  active_from: "",
  active_until: "",
  created_at: "",
};

export { initialSurvey };
