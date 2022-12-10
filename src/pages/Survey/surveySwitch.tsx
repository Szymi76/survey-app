import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import SurveyContext from "../../contexts/SurveyContext";
import useFetch from "../../hooks/useFetch";
import { Answer, Answers as AnswersType, Question, Survey } from "../../types/Survey";
import Answers from "./answers";
import ThanksModal from "./thanksModal";
import API from "../../api";

const SurveySwitch = ({ answersList }: { answersList: AnswersType }) => {
  const [done, setDone] = useState<string | null>(null);
  // UPLOAD ODPOWIEDZI NA ANKIETE DO BAZY DANYCH
  const [uploadResult, uploadErr, uploadLoading, uploadAnswer] = useFetch<Survey>(
    "POST",
    API.UPLOAD_ANSWER_URL,
    answersList,
    true
  );

  useEffect(() => {
    const value = localStorage.getItem(survey?._id ?? "error");
    setDone(value);
  }, []);

  const context = useContext(SurveyContext);
  if (!context) return <></>;
  const { answers, survey } = context;
  if (!survey) return <></>;

  // DATY JAKO LICZBY
  const now = +new Date();
  const from = +survey.active_from;
  const until = +survey.active_until;

  // SPRAWDZANIE JAKI PRZYPADEK WYSTĘPUJE
  let render = "active";
  if (from > now) render = "not_active_yet";
  if (until < now) render = "inactive";
  if (done === "true") render = "done";

  const handleAnswerUpload = async () => {
    if (uploadResult) return;
    await uploadAnswer();
    localStorage.setItem(survey._id ?? "error", "true");
  };

  // SWITCH
  switch (render) {
    case "active": {
      return (
        <>
          <section id="survey-header" className="flex-col items-center text-center">
            <h2 className="text-2xl font-semibold">{survey.title}</h2>{" "}
          </section>
          <Answers />
          <section id="survey-footer">
            <button
              className={`btn btn-long bg-indigo-700 disabled:opacity-60`}
              disabled={!surveyIsCorrect(answers, survey.questions)}
              onClick={handleAnswerUpload}>
              Prześlij
            </button>
          </section>
          {uploadResult && <ThanksModal />}
        </>
      );
    }
    case "not_active_yet": {
      return (
        <section id="survey-header" className="flex-col items-center text-center">
          <h2 className="text-2xl font-semibold">Ankieta nie jest jeszcze aktywna 😔</h2>{" "}
          <Link to={"/"}>
            <button className="btn bg-indigo-700">Wróć do strony głównej</button>{" "}
          </Link>{" "}
        </section>
      );
    }
    case "inactive": {
      return (
        <section id="survey-header" className="flex-col items-center text-center">
          <h2 className="text-2xl font-semibold">Ankieta już wygasła 😔</h2>{" "}
          <Link to={"/"}>
            <button className="btn bg-indigo-700">Wróć do strony głównej</button>{" "}
          </Link>{" "}
        </section>
      );
    }
    case "done": {
      return (
        <section id="survey-header" className="flex-col items-center text-center">
          <h2 className="text-2xl font-semibold">Ankieta została już przez ciebie wypełniona 😭</h2>{" "}
          <Link to={"/"}>
            <button className="btn bg-indigo-700">Wróć do strony głównej</button>{" "}
          </Link>{" "}
        </section>
      );
    }
    default:
      <></>;
  }
};

export default SurveySwitch;

// SPRAWDZA CZY ANKIETA ZOSTAŁĄ POPRAWNIE WYPEŁNIONA
function surveyIsCorrect(ans: Answer[], qns: Question[], min = 2) {
  return ans.every((an, i) => {
    if (!qns[i].required) return true;
    if (an.list.some((l) => l.length < min) || an.list.length == 0) return false;
    return true;
  });
}
