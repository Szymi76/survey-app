import React from "react";
import { Link } from "react-router-dom";

const SurveyNotFound = () => {
  return (
    <section id="survey-header" className="flex-col items-center">
      <h2 className="text-2xl font-semibold">Nie ma takiej ankiety 😔</h2>{" "}
      <Link to={"/"}>
        <button className="btn bg-indigo-700">Wróć do strony głównej</button>{" "}
      </Link>{" "}
    </section>
  );
};

export default SurveyNotFound;
