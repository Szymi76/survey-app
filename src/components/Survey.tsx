import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import AnswerElement from "./AnswerElement";
import { Oval } from "react-loader-spinner";
import { Answer, Survey, Answers, Question } from "../types/Survey";
import useFetch from "../hooks/useFetch";

const GET_URL = "http://localhost:3000/api/survey/";
const PUBLIC_GET_URL = "https://sandbox.herokuapp.com/api/get-survey/";

const SurveyPage = () => {
  const { id } = useParams();
  const [survey, error, loading] = useFetch<Survey>(`${GET_URL}${id}`);
  // const { timer } = useTimer(survey?.active_until);

  useEffect(() => {
    console.log(survey);
  }, [survey]);

  const [ans, setAns] = useState<Answer[]>([]);

  const handleAnswersUpload = async () => {
    const answersList: Answers = {
      answered_at: +new Date(),
      surveyID: survey?._id,
      list: ans,
    };

    console.log(answersList);
    axios
      .post("http://localhost:5000/api/add-answer/", {
        ...answersList,
      })
      .then(res => console.log(res.data))
      .catch(err => console.warn(err));
  };

  useEffect(() => {
    if (!survey) return;

    const answers = survey.questions.map((qn, i) => {
      const freshAns: Answer = {
        list: [],
        type: qn.type,
      };
      return freshAns;
    });

    setAns(answers);
  }, [survey]);

  if (survey && +new Date() < +new Date(survey.active_from))
    return (
      <section id="survey-wrapper">
        <section id="survey-header">
          <div className="flex flex-col items-center gap-5">
            <h2 className="text-2xl font-semibold">
              Ankieta nie jest jeszcze aktywna 😔
            </h2>
            <Link to={"/"}>
              <button className="btn bg-indigo-700">Wróć do strony głównej</button>
            </Link>
          </div>
        </section>
      </section>
    );
  if (survey && +new Date() > +new Date(survey.active_until))
    return (
      <section id="survey-wrapper">
        <section id="survey-header">
          <div className="flex flex-col items-center gap-5">
            <h2 className="text-2xl font-semibold">Nie ma takiej ankiety 😔</h2>
            <Link to={"/"}>
              <button className="btn bg-indigo-700">Wróć do strony głównej</button>
            </Link>
          </div>
        </section>
      </section>
    );

  return (
    <section id="survey-wrapper">
      <section id="survey-header">
        {survey ? (
          <div className="flex flex-col justify-center items-center gap-3">
            <h1>{survey.title}</h1>
            <h4 className="text-2xl text-gray-400 font-light">
              {/* {timer.days}:{timer.hours}:{timer.minutes}:{timer.seconds} */}
            </h4>
          </div>
        ) : (
          <>
            {loading ? (
              <Oval color="#4338CA" secondaryColor="#4338CA" height={50} />
            ) : (
              <div className="flex flex-col items-center gap-5">
                <h2 className="text-2xl font-semibold">Nie ma takiej ankiety 😔</h2>
                <Link to={"/"}>
                  <button className="btn bg-indigo-700">Wróć do strony głównej</button>
                </Link>
              </div>
            )}
          </>
        )}
      </section>
      {survey && ans && (
        <>
          <section>
            {survey.questions.map((qn, i) => (
              <AnswerElement key={"ans" + i} ans={ans[i]} setAns={setAns} qn={qn} i={i} />
            ))}
          </section>
          <section id="survey-footer">
            <button
              className={`btn btn-long bg-indigo-700 disabled:opacity-60`}
              disabled={!surveyIsCorrect(ans, survey?.questions)}
              onClick={handleAnswersUpload}
            >
              Prześlij
            </button>
          </section>
        </>
      )}
    </section>
  );
};

export default SurveyPage;

function surveyIsCorrect(ans: Answer[], qns: Question[]) {
  return ans.every((an, i) => {
    if (
      (an.list.length == 0 || an.list.map(a => a.trim()).includes("")) &&
      qns[i].required
    )
      return false;
    return true;
  });
}
