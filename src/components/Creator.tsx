import React, { useEffect, useState, useRef } from "react";
import { PencilIcon, XMarkIcon } from "@heroicons/react/24/solid";
import QuestionElement from "./QuestionElement";
import QuestionsMenu from "./QuestionsMenu";
import PublishModal from "./PublishModal";
import useAuth from "../hooks/useAuth";
import { Question, Survey } from "../types/Survey";
import { DEFAULT_SHORT_QN } from "../data/defaultQns";

interface dateTypes {
  start: string;
  end: string;
}

const Creator = () => {
  const [qns, setQns] = useState<Question[]>([DEFAULT_SHORT_QN]);
  const [date, setDate] = useState<dateTypes>({ start: "", end: "" });
  const [menuToggled, setMenuToggled] = useState(false);
  const [showPublish, setShowPublish] = useState(false);
  const [errors, setErrors] = useState<string[]>([]);
  const [survey, setSurvey] = useState<Survey | null>(null);

  const { user } = useAuth();

  const titleInputRef = useRef<HTMLInputElement>(null);

  // walidacja ankiety
  const handleValidation = () => {
    const freshErrs: string[] = [];

    // validacja
    if (!titleInputRef.current || titleInputRef.current.value.length < 8)
      freshErrs.push("Długośc tytułu musi wynosić co najmniej 8 znaków.");
    if (date.start.length == 0) freshErrs.push("Początek daty nie może być pusty.");
    if (date.end.length == 0) freshErrs.push("Koniec daty nie może być pusty.");
    if (qns.some(qn => qn.label.length < 8))
      freshErrs.push("Długośc tytułu każdego z pytań musi wynosić co najmniej 8 znaków.");
    if (qns.some(qn => qn.limit < 2))
      freshErrs.push("Liczba limitu każdego z pytań musi wynosić co najmniej 2.");

    setErrors([...freshErrs]);
    if (freshErrs.length == 0) setShowPublish(true);

    setSurvey({
      title: titleInputRef.current?.value ?? "Tytuł ankiety",
      active_from: +new Date(date.start),
      active_until: +new Date(date.end),
      userID: user?.id || "",
      created_at: +new Date(),
      questions: qns,
    });
  };

  return (
    <section id="creator-wrapper">
      <section id="creator-options">
        <div id="qns-info">
          <p>Ilość pytań {qns.length}</p>
          <p>
            {date.start.length > 0 ? date.start : "?"} -{" "}
            {date.end.length > 0 ? date.end : "?"}
          </p>
        </div>
        <div id="options-buttons">
          <button className="btn bg-indigo-700" onClick={handleValidation}>
            Zakończ i opublikuj
          </button>
          <button
            className="btn bg-indigo-700 qns-prev"
            onClick={() => setMenuToggled(menuToggled => !menuToggled)}
          >
            Dodaj pytanie
          </button>
        </div>
        <QuestionsMenu
          toggled={menuToggled}
          setToggled={setMenuToggled}
          setQns={setQns}
        />
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
      <div id="primary-inputs">
        <div className="input-with-icon">
          <input type={"text"} defaultValue={"Jakis tekst"} ref={titleInputRef} />
          <PencilIcon className="h-6" />
        </div>
        <div id="date-inputs-row">
          <div className="input-with-row">
            <label>Początek</label>
            <input
              type={"date"}
              onChange={e => setDate({ ...date, start: e.target.value })}
            />
          </div>
          <div className="input-with-row">
            <label>Koniec</label>
            <input
              type={"date"}
              onChange={e => setDate({ ...date, end: e.target.value })}
            />
          </div>
        </div>
      </div>

      {qns.map((qn, i) => {
        return <QuestionElement key={"qn" + i} qns={qns} i={i} setQns={setQns} />;
      })}
      <PublishModal show={showPublish} setShow={setShowPublish} survey={survey} />
    </section>
  );
};

export default Creator;
