enum qnTypes {
  YES_NO = "YES_NO",
  SINGLE = "SINGLE",
  MULTI = "MULTI",
  LONG = "LONG",
  SHORT = "SHORT",
}

interface Question {
  _id?: string;
  label: string;
  type: qnTypes;
  list: string[];
  limit: number;
  required: boolean;
  placeholder: string;
}

interface Answer {
  _id?: string;
  type: qnTypes;
  list: string[];
}

interface Answers {
  surveyID?: string;
  list: Answer[];
  answered_at: number;
}

interface Survey {
  _id?: string;
  title: string;
  userID: string;
  questions: Question[];
  created_at: number | string;
  active_from: number | string;
  active_until: number | string;
}

interface GroupedAnswers {
  label: string;
  type: qnTypes;
  list: { label: string; count: number }[];
}

export type { Survey, Question, Answers, Answer, GroupedAnswers };
export { qnTypes };
