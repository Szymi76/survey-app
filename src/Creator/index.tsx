import React, { useEffect, useState, useRef, useContext } from "react";
import { useImmer } from "use-immer";
import { PencilIcon, XMarkIcon } from "@heroicons/react/24/solid";
import Switch from "./switch";
import QuestionsMenu from "./menu";
import Modal from "./modal";
import useAuth from "../hooks/useAuth";
import { Question, Survey } from "../types/Survey";
import { DEFAULT_SHORT_QN } from "../data/defaultQns";
import CreatorContext from "../contexts/CreatorContext";

interface dateTypes {
  from: string;
  until: string;
}

const Creator = () => {
  const [qns, setQns] = useImmer<Question[]>([DEFAULT_SHORT_QN]);
  const [survey, setSurvey] = useState<Survey | null>(null);
  const [dates, setDates] = useState<dateTypes>({ from: "", until: "" });
  const [toggled, setToggled] = useState(false);
  const [show, setShow] = useState(false);
  const [errors, setErrors] = useState<string[]>([]);

  const { user } = useAuth();

  // REF DO TYTUŁU
  const titleInputRef = useRef<HTMLInputElement>(null);

  // WALIDACJA ANKIETY
  const handleValidation = () => {
    const freshErrs: string[] = [];

    // WALIDACJA
    if (!titleInputRef.current || titleInputRef.current.value.length < 8)
      freshErrs.push("Długośc tytułu musi wynosić co najmniej 8 znaków.");
    if (dates.from.length == 0) freshErrs.push("Początek daty nie może być pusty.");
    if (dates.until.length == 0) freshErrs.push("Koniec daty nie może być pusty.");
    if (qns.some(qn => qn.label.length < 8))
      freshErrs.push("Długośc tytułu każdego z pytań musi wynosić co najmniej 8 znaków.");
    if (qns.some(qn => qn.limit < 2))
      freshErrs.push("Liczba limitu każdego z pytań musi wynosić co najmniej 2.");

    // USTAWIANIE BŁĘDÓW
    setErrors([...freshErrs]);
    if (freshErrs.length == 0) setShow(true);

    // SETTER
    setSurvey({
      title: titleInputRef.current?.value ?? "Tytuł ankiety",
      active_from: +new Date(dates.from),
      active_until: +new Date(dates.until),
      userID: user?.id || "",
      created_at: +new Date(),
      questions: qns,
    });
  };

  return (
    <CreatorContext.Provider value={{ qns, setQns, survey }}>
      <section id="creator-wrapper">
        <section id="creator-options">
          <div id="qns-info">
            <p>Ilość pytań {qns.length}</p>
            <p>
              {dates.from.length > 0 ? dates.from : "?"} -{" "}
              {dates.until.length > 0 ? dates.until : "?"}
            </p>
          </div>
          <div id="options-buttons">
            <button className="btn bg-indigo-700" onClick={handleValidation}>
              Zakończ i opublikuj
            </button>
            <button
              className="btn bg-indigo-700 qns-prev"
              onClick={() => setToggled(toggled => !toggled)}
            >
              Dodaj pytanie
            </button>
          </div>
          <QuestionsMenu toggled={toggled} setToggled={setToggled} />
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
                onChange={e => setDates({ ...dates, from: e.target.value })}
              />
            </div>
            <div className="input-with-row">
              <label>Koniec</label>
              <input
                type={"date"}
                onChange={e => setDates({ ...dates, until: e.target.value })}
              />
            </div>
          </div>
        </div>
        {qns.map((qn, i) => (
          <Switch key={"qn" + i} i={i} />
        ))}
        <Modal show={show} setShow={setShow} />
      </section>
    </CreatorContext.Provider>
  );
};

export default Creator;
