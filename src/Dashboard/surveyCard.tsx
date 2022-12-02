import React, { useEffect, useState } from "react";
import { CalculatorIcon, CalendarDaysIcon } from "@heroicons/react/24/outline";
import {
  ChartPieIcon,
  ClipboardDocumentCheckIcon,
  ClipboardIcon,
  ServerIcon,
  TrashIcon,
} from "@heroicons/react/24/solid";
import { Survey } from "../types/Survey";
import { useNavigate } from "react-router-dom";

type SurveyCardProps = {
  survey: Survey;
  setSurveyId: React.Dispatch<React.SetStateAction<string | null>>;
};

const SurveyCard = ({ survey, setSurveyId }: SurveyCardProps) => {
  const [copied, setCopied] = useState(false);
  const navigate = useNavigate();
  const len = survey.title.length;
  const now = +new Date();
  let status = "Aktywna";
  if (now < survey.active_from) status = "Nie aktywna";
  if (now > survey.active_until) status = "Zakończona";

  // PRZYWRACANIE "copied" DO "false" PO 2 SEKUNDACH
  useEffect(() => {
    if (!copied) return;

    const timeout = setTimeout(() => {
      setCopied(false);
      console.log(1);
    }, 3000);

    timeout;

    return () => clearTimeout(timeout);
  }, [copied]);

  // KOPIOWANIE TEKSTU
  const writeToClipboard = () => {
    if (!survey._id) return;
    navigator.clipboard.writeText(survey._id);
    setCopied(true);
  };

  return (
    <div className="survey-card">
      <h1 className="survey-card-header">
        {survey.title.slice(0, 30)}
        {len > 30 && "..."}
      </h1>
      <div className="survey-card-content">
        <span>
          <CalculatorIcon className="h-7" />
          <p>Liczba pytań - {survey.questions.length}</p>
        </span>
        <span>
          <CalendarDaysIcon className="h-7" />
          <p>
            Data aktywacji - {new Date(survey.active_from).toISOString().slice(0, 10)}
          </p>
        </span>
        <span>
          <CalendarDaysIcon className="h-7" />
          <p>
            Data aktywacji - {new Date(survey.active_until).toISOString().slice(0, 10)}
          </p>
        </span>
        <span className="survey-card-copy-row">
          <div className="flex gap-3">
            <h2 className="font-semibold">ID</h2>
            <h3>{survey._id}</h3>
          </div>
          {copied ? (
            <ClipboardDocumentCheckIcon
              className="h-6 text-green-600 cursor-pointer hover:brightness-90"
              onClick={writeToClipboard}
            />
          ) : (
            <ClipboardIcon
              className="h-6 cursor-pointer hover:brightness-90"
              onClick={writeToClipboard}
              title="Kopiuj"
            />
          )}
        </span>
      </div>
      <div className="survey-card-footer">
        <div>
          <ServerIcon className="h-7" title="Status" />
          <h6>{status}</h6>
        </div>
        <div>
          <ChartPieIcon
            className="h-7 cursor-pointer duration-100 hover:text-yellow-500"
            onClick={() => navigate(`/statystyki/${survey._id}`)}
            title="Statystyki"
          />
          <TrashIcon
            className="h-7 cursor-pointer duration-100 hover:text-red-500"
            onClick={() => setSurveyId(survey._id ?? null)}
            title="Usuń"
          />
        </div>
      </div>
    </div>
  );
};

export default SurveyCard;
