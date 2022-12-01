import React, { useEffect, useState, useContext } from "react";
import { Oval } from "react-loader-spinner";
import {
  ClipboardDocumentIcon,
  ClipboardDocumentCheckIcon,
} from "@heroicons/react/24/solid";
import { Survey } from "../types/Survey";
import CreatorContext from "../contexts/CreatorContext";
import useFetch from "../hooks/useFetch";
import { useNavigate } from "react-router-dom";
import API from "../api";

type PublishModalProps = {
  show: boolean;
  setShow: React.Dispatch<React.SetStateAction<boolean>>;
};

const PublishModal = ({ show, setShow }: PublishModalProps) => {
  const [copied, setCopied] = useState(false);
  const navigate = useNavigate();
  const context = useContext(CreatorContext);
  if (!context) return <></>;
  const { survey, setSurvey } = context;

  // PRZESYŁANIE ANKIETY W MOMENCIE WYWOŁANIA FUNKCJI 'publishSurvey'
  const [data, error, loading, publishSurvey] = useFetch<Survey>(
    "POST",
    API.UPLOAD_SURVEY_URL,
    survey,
    true
  );

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

  //  NIE POKAZYWANIE MODALA
  if (!show) return <></>;

  // PUBLIKACJA ANKIETY
  const handleSurveyPublish = async () => {
    setSurvey(survey => {
      survey.created_at = +new Date();
      publishSurvey();
    });
  };

  // KOPIOWANIE TEKSTU
  const writeToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
  };

  return (
    <section id="publish-modal-wrapper">
      <div id="publish-modal">
        {!data ? (
          <>
            <h1>Czy na pewno chcesz zakończyć tworzenie ankiety?</h1>
            <p>
              Kliknięcie <span className="text-indigo-700">Zakończ i opublikuj</span>{" "}
              spowoduje przesłanie ankiety do bazy danych. Aby{" "}
              <span className="text-red-500"> usunąć </span>
              ankiete wejdź do panelu użytkownika i znajdź właściwy dokument.{" "}
              <span className="text-indigo-700 underline">
                Ankieta po publikacji nie może być już edytowana.
              </span>
            </p>
            <div className="publish-row">
              {!loading ? (
                <>
                  {error && <h3 className=" text-red-500 w-full">Coś poszło nie tak</h3>}

                  <button className="btn bg-red-500" onClick={() => setShow(false)}>
                    Cofnij
                  </button>
                  <button className="btn bg-indigo-700" onClick={handleSurveyPublish}>
                    Zakończ i opublikuj
                  </button>
                </>
              ) : (
                <Oval color="#4338CA" secondaryColor="#4338CA" height={40} />
              )}
            </div>
          </>
        ) : (
          <>
            <h1>Pomyślnie przesłano ankiete do bazy danych.</h1>
            <p>
              Kliknij <span className="text-indigo-700">Zakończ</span> aby wrócić do
              strony głównej.
            </p>
            <div className="flex justify-end flex-wrap gap-1">
              <div className="input-with-button">
                <input type={"text"} defaultValue={data ? data._id : ""} />
                <button
                  onClick={() => data._id && writeToClipboard(data._id)}
                  title="Kopiuj id ankiety"
                >
                  {copied ? (
                    <ClipboardDocumentCheckIcon className="h-4 text-green-500" />
                  ) : (
                    <ClipboardDocumentIcon className="h-4" />
                  )}
                </button>
              </div>

              <button
                className="btn bg-indigo-700"
                onClick={() => navigate("/")}
                title="Wróć do strony głównej"
              >
                Zakończ
              </button>
            </div>
          </>
        )}
      </div>
    </section>
  );
};

export default PublishModal;
