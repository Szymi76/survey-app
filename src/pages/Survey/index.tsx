import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { Oval } from "react-loader-spinner";
import { Answer, Survey, Answers, Question } from "../../types/Survey";
import useFetch from "../../hooks/useFetch";
import { useImmer } from "use-immer";
import SurveyContext from "../../contexts/SurveyContext";
import SurveySwitch from "./surveySwitch";
import SurveyNotFound from "./surveyNotFound";
import API from "../../api";

const SurveyPage = () => {
  const { id } = useParams();
  const [survey, error, loading] = useFetch<Survey>("GET", `${API.GET_SURVEY_URL}${id}`);
  const [answers, setAnswers] = useImmer<Answer[]>([]);

  // DEBUG -- CONSOLE.LOG()
  // useEffect(() => {
  //   console.log(answers);
  // }, [answers]);

  //  LISTA WSZYSTKICH ODPOWIEDZI
  const answersList: Answers = {
    answered_at: +new Date(),
    surveyID: survey?._id,
    list: answers,
  };

  // USTAWIANIE DOMYŚLNEJ WARTOŚCI DLA ODPOWIEDZI
  useEffect(() => {
    if (!survey) return;
    const initialAnswers = survey.questions.map((qn) => ({ type: qn.type, list: [] }));
    setAnswers(initialAnswers);
  }, [survey]);

  return (
    <SurveyContext.Provider value={{ answers, setAnswers, survey }}>
      <section id="survey-wrapper">
        {survey && answers.length != 0 ? (
          // @ts-ignore
          <SurveySwitch answersList={answersList} />
        ) : loading ? (
          <div className="flex justify-center">
            <Oval color="#4338CA" secondaryColor="#4338CA" />
          </div>
        ) : (
          <SurveyNotFound />
        )}
      </section>
    </SurveyContext.Provider>
  );
};

export default SurveyPage;
