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
  created_at: number;
  active_from: number;
  active_until: number;
}

export type { Survey, Question, Answers, Answer };
export { qnTypes };
