import React, { useEffect, useState, useContext } from "react";
import { Link } from "react-router-dom";
import useFetch from "../hooks/useFetch";
import { Survey } from "../types/Survey";
import API from "../api";
import SurveyCard from "./surveyCard";
import ConfirmModal from "./confirmModal";
import { Oval } from "react-loader-spinner";
import AuthContext from "../contexts/AuthContext";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const [deleteSurvey, setDeleteSurvey] = useState<null | string>(null);
  const [surveys, error, loading] = useFetch<Survey[]>("GET", API.GET_ALL_SURVEYS);
  const navigate = useNavigate();
  const auth = useContext(AuthContext);
  if (!auth) return <></>;
  const { user } = auth;

  // PRZEKIEROWANIE JEŚLI UZYTKOWNIK JEST NIE ZALOGOWANY
  useEffect(() => {
    if (user === null)
      navigate("/auth", { state: { page: "login", redirect: "dashboard" } });
  }, [user]);

  if (surveys && surveys.length === 0)
    return (
      <section id="content-wrapper">
        <h1 className="mt-16 pt-6 text-center text-2xl font-semibold">
          Nie masz żadnych utworzonych ankiet 😭
        </h1>
      </section>
    );

  return (
    <>
      <section id="content-wrapper">
        <section id="content-header">
          <h1>Dashboard</h1>
          <div>
            <Link to={"/ustawienia"}>Ustawienia</Link>
            <Link to={"/dashboard"}>Dashboard</Link>
          </div>
        </section>
        <section id="content">
          <div id="survey-cards-container">
            {surveys ? (
              <>
                {surveys.map((survey, index) => (
                  <SurveyCard
                    key={"survey-card" + index}
                    survey={survey}
                    setSurveyId={setDeleteSurvey}
                  />
                ))}
              </>
            ) : (
              <Oval color="#4338CA" secondaryColor="#4338CA" height={40} />
            )}
          </div>
        </section>
      </section>
      <ConfirmModal show={deleteSurvey} setShow={setDeleteSurvey} />
    </>
  );
};

export default Dashboard;
