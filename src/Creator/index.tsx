import { useImmer } from "use-immer";
import { Survey } from "../types/Survey";
import { initialSurvey } from "./initialValues";
import useAuth from "../hooks/useAuth";
import CreatorContext from "../contexts/CreatorContext";
import { useContext, useEffect, useState } from "react";
import { XMarkIcon } from "@heroicons/react/24/outline";
import PrimaryInputs from "./primaryInputs";
import Questions from "./questions";
import PublishModal from "./publishModal";
import QuestionTypesMenu from "./questionTypesMenu";
import AuthContext from "../contexts/AuthContext";

const Creator = () => {
  const [survey, setSurvey] = useImmer<Survey>(initialSurvey);
  const [showModal, setShowModal] = useState(false);
  const [toggledMenu, setToggledMenu] = useState(false);
  const [errors, setErrors] = useState<string[]>([]);

  const auth = useContext(AuthContext);
  if (!auth) return <></>;
  const { user } = auth;

  // USTAWIANIE ID UŻYTKOWNIKA W MOMENCIE GDY UŻYTKOWNIK NIE JEST NULL --- (BŁĄD PODCZAS LOGOWANIA)
  useEffect(() => {
    if (!user) return;
    setSurvey(survey => {
      survey.userID = user.id;
    });
  }, [user]);

  // DEBUG --- CONSOLE.LOG()
  // useEffect(() => console.log(survey), [survey]);

  // DATA AKTYWACJI I DEZAKTYWACJI
  const prettyDate = (n: number | string) => new Date(n).toISOString().slice(0, 10);
  const { active_from, active_until } = survey;
  const from = !active_from ? "?" : prettyDate(active_from);
  const until = !active_until ? "?" : prettyDate(active_until);

  // WALIDACJA ANKIETY
  const handleSurveyValidation = () => {
    const freshErrs = [];

    if (survey.title.trim().length < 5)
      freshErrs.push("Długośc tytułu musi wynosić co najmniej 5 znaków.");
    if (!survey.active_from) freshErrs.push("Początek daty nie może być pusty.");
    if (!survey.active_until) freshErrs.push("Koniec daty nie może być pusty.");
    if (survey.questions.some(qn => qn.label.trim().length < 5))
      freshErrs.push("Długośc tytułu każdego z pytań musi wynosić co najmniej 5 znaków.");
    if (survey.questions.some(qn => qn.limit < 2))
      freshErrs.push("Liczba limitu każdego z pytań musi wynosić co najmniej 2.");

    setErrors(freshErrs);
    if (freshErrs.length > 0) return;
    setShowModal(true);
  };

  return (
    <CreatorContext.Provider value={{ survey, setSurvey }}>
      <section id="creator-wrapper">
        <section id="creator-options">
          <div id="qns-info">
            <p>Ilość pytań {survey.questions.length}</p>
            <p>
              {from} - {until}
            </p>
          </div>
          <div id="options-buttons">
            <button className="btn bg-indigo-700" onClick={handleSurveyValidation}>
              Zakończ i opublikuj
            </button>
            <button
              className="btn bg-indigo-700 qns-prev"
              onClick={() => setToggledMenu(!toggledMenu)}
            >
              Dodaj pytanie
            </button>
          </div>
          <QuestionTypesMenu toggled={toggledMenu} setToggled={setToggledMenu} />
        </section>
        <div id="creator-errors">
          {errors.map((err, i) => {
            const handleRemoveErr = () => {
              setErrors(errors => errors.filter((err, ind) => i != ind));
            };

            return (
              <div key={"error" + i} className="bg-red-100">
                <p>{err}</p>
                <XMarkIcon
                  className="h-6 text-red-500 cursor-pointer"
                  onClick={handleRemoveErr}
                />
              </div>
            );
          })}
        </div>
        <PrimaryInputs />
        <Questions />
        <PublishModal show={showModal} setShow={setShowModal} />
      </section>
    </CreatorContext.Provider>
  );
};

export default Creator;
