import { qnTypes, Question } from "../types/Survey";

const DEFAULT_YES_NO_QN: Question = {
  type: qnTypes.YES_NO,
  label: "Tytuł pytania ... ?",
  limit: 2,
  list: [],
  placeholder: "",
  required: true,
};
const DEFAULT_SINGLE_QN: Question = {
  type: qnTypes.SINGLE,
  label: "Tytuł pytania ... ?",
  limit: 2,
  list: ["Miły", "Zły"],
  placeholder: "",
  required: true,
};
const DEFAULT_MULTI_QN: Question = {
  type: qnTypes.MULTI,
  label: "Tytuł pytania ... ?",
  limit: 2,
  list: ["Miły", "Zły"],
  placeholder: "",
  required: true,
};
const DEFAULT_SHORT_QN: Question = {
  type: qnTypes.SHORT,
  label: "Tytuł pytania ... ?",
  limit: 18,
  list: [],
  placeholder: "Twoja odpowiedz tutaj ...",
  required: true,
};
const DEFAULT_LONG_QN: Question = {
  type: qnTypes.LONG,
  label: "Tytuł pytania ... ?",
  limit: 250,
  list: [],
  placeholder: "Twoja odpowiedz tutaj ...",
  required: true,
};

// const DEFAULT_ANS: Answer = {
//   index: 0,
//   list: [],
//   questionID: null,
//   type: qnTypes.LONG
// }

export {
  DEFAULT_YES_NO_QN,
  DEFAULT_SINGLE_QN,
  DEFAULT_MULTI_QN,
  DEFAULT_SHORT_QN,
  DEFAULT_LONG_QN,
};
