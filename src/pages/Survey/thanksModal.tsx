import React from "react";
import { useNavigate } from "react-router-dom";

const ThanksModal = () => {
  const navigate = useNavigate();

  return (
    <section id="publish-modal-wrapper">
      <div id="publish-modal">
        <h1>Dziękujemy za przesłanie odpowiedzi.</h1>
        <p>
          Kliknij <span className="text-indigo-700">Powrót</span> aby przejść do strony głównej.
        </p>
        <div className="publish-row">
          <button className="btn bg-indigo-700" onClick={() => navigate("/")}>
            Powrót
          </button>
        </div>
      </div>
    </section>
  );
};

export default ThanksModal;
