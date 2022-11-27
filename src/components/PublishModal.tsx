import { useEffect, useState } from "react";
import axios from "axios";
import React from "react";
import { Link } from "react-router-dom";
import { Oval } from "react-loader-spinner";
import { ClipboardDocumentIcon } from "@heroicons/react/24/solid";
import { Survey } from "../types/Survey";

interface PublishModalProps {
  show: boolean;
  setShow: React.Dispatch<React.SetStateAction<boolean>>;
  survey: Survey | null;
}

const PublishModal = ({ show, setShow, survey }: PublishModalProps) => {
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);
  const [published, setPublished] = useState(false);
  const [id, setId] = useState<any>(null);

  useEffect(() => console.log(id), [id]);

  if (!show) return <></>;

  const handleModalPublish = async () => {
    setLoading(true);
    setError(false);
    axios
      .post("http://localhost:3000/api/survey/upload-survey", survey, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      })
      .then(res => {
        setLoading(false);
        setError(false);
        // setPublished(true);
        // setId(res.data._id);
        console.log(res.data);
      })
      .catch(err => {
        setLoading(false);
        setError(true);
        console.warn(err);
      });
  };

  return (
    <section id="publish-modal-wrapper">
      <div id="publish-modal">
        {!published ? (
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
                  {error && (
                    <h3 className="absolute text-red-500 bottom-1 left-1">
                      {" "}
                      Coś poszło nie tak
                    </h3>
                  )}

                  <button className="btn bg-red-500" onClick={() => setShow(false)}>
                    Cofnij
                  </button>
                  <button className="btn bg-indigo-700" onClick={handleModalPublish}>
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
              {/* <div className="input-with-button">
                <input type={"text"} placeholder="Element" />
                <button>
                  <ClipboardDocumentIcon className="h-4" />
                </button>
              </div> */}
              <Link to={"/"}>
                <button className="btn bg-indigo-700">Zakończ</button>
              </Link>
            </div>
          </>
        )}
      </div>
    </section>
  );
};

export default PublishModal;
