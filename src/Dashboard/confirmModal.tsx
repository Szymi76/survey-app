import React from "react";
import { Oval } from "react-loader-spinner";
import useFetch from "../hooks/useFetch";
import API from "../api";
import { Survey } from "../types/Survey";

type ConfirmModalProps = {
  show: null | string;
  setShow: React.Dispatch<React.SetStateAction<string | null>>;
};

const ConfirmModal = ({ show, setShow }: ConfirmModalProps) => {
  const [result, error, loading, deleteSurvey] = useFetch(
    "DELETE",
    `${API.DELETE_SURVEY_URL}${show}`,
    {},
    true
  );

  const handleDeleteSurvey = async () => {
    await deleteSurvey();
    location.reload();
  };

  return (
    <>
      {show && (
        <section id="publish-modal-wrapper">
          <div id="publish-modal">
            <h1>Czy na pewno chcesz usunąć ankiete?</h1>
            <p>
              Kliknięcie <span className="text-red-500">Usuń</span> spowoduje stałe
              usunięcie wybranej ankiety z bazy dancyh.
            </p>
            <div className="publish-row">
              {/* {error && <p className="text-red-500">Coś poszło nie tak</p>} */}
              <>
                {loading ? (
                  <Oval color="#4338CA" secondaryColor="#4338CA" height={30} />
                ) : (
                  <>
                    <button className="btn bg-indigo-700" onClick={() => setShow(null)}>
                      Cofnij
                    </button>
                    <button className="btn bg-red-500" onClick={handleDeleteSurvey}>
                      Usuń
                    </button>
                  </>
                )}
              </>
            </div>
          </div>
        </section>
      )}
    </>
  );
};

export default ConfirmModal;
