import React, { useEffect, useMemo, useContext } from "react";
import { useParams } from "react-router-dom";
import useFetch from "../../hooks/useFetch";
import API from "../../api";
import { Answers, Survey, GroupedAnswers } from "../../types/Survey";
import AnswersStats from "./AnswersStats";
import AuthContext from "../../contexts/AuthContext";
import { useNavigate } from "react-router-dom";

const Stats = () => {
  const { id } = useParams();
  const [answers, error, loading] = useFetch<Answers[]>(
    "GET",
    `${API.GET_ALL_SURVEY_ANSWERS_URL}${id}`
  );
  const [survey, survErr, survLoad] = useFetch<Survey>("GET", `${API.GET_SURVEY_URL}${id}`);

  const navigate = useNavigate();
  const auth = useContext(AuthContext);
  if (!auth) return <></>;
  const { user } = auth;

  let validUser = survey && user && survey.userID === user.id ? true : false;

  // PRZEKIEROWANIE JEŚLI UZYTKOWNIK JEST NIE ZALOGOWANY
  useEffect(() => {
    if (user === null) navigate("/auth", { state: { page: "login", redirect: "" } });
    if (survey && user?.id !== survey.userID)
      navigate("/auth", { state: { page: "login", redirect: "" } });
  }, [user, survey]);

  // POGRÓPOWANE WSZYSTKIE ODPOWIEDZI DO ANKIETY
  const groupedAnswers: GroupedAnswers[] = useMemo(() => {
    if (!survey || !answers) return [];
    const grouped = survey.questions.map((qn, i) => {
      const list = answers.reduce((res: string[], an, j) => {
        const arr = an.list.filter((a, k) => a.type == qn.type);
        const arr1 = arr.reduce((total: string[], item) => {
          const arr2 = total.concat(...item.list);
          return arr2;
        }, []);
        return [...res, ...arr1];
      }, []);
      return {
        label: qn.label,
        type: qn.type,
        list,
      };
    });

    return grouped.reduce((total: GroupedAnswers[], item) => {
      const labels = Array.from(new Set(item.list)).filter((l) => l != "");
      const list = labels.map((label, i) => {
        return { label, count: item.list.filter((l) => l == label).length };
      });

      return [...total, { ...item, list }];
    }, []);
  }, [answers, survey]);

  return (
    <section id="stats-wrapper">
      {survey && validUser && (
        <div id="stats-header">
          <h1 className="text-2xl font-semibold mb-3">{survey.title}</h1>
          <p className="text-gray-300 font-light ">
            Aktywna od - {new Date(survey.active_from).toISOString().slice(0, 10)}
          </p>
          <p className="text-gray-300 font-light">
            Aktywna do - {new Date(survey.active_until).toISOString().slice(0, 10)}
          </p>
          <h3 className="mt-2">Liczba odpowiedzi na ankiete - {answers?.length ?? "?"}</h3>
        </div>
      )}
      {answers && <AnswersStats answers={groupedAnswers} />}
    </section>
  );
};

export default Stats;
