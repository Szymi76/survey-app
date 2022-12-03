import React from "react";
import { Link } from "react-router-dom";

const PageNotFound = () => {
  return (
    <section className="min-h-screen pt-32 text-center">
      <h1 className="text-4xl font-semibold">404</h1>
      <h3 className="text-gray-600 text-xl">Nie udało się znaleść strony 😦</h3>
      <p className="text-gray-500">
        Jeśli ręcznie wpisywałeś link, sprawdź czy jest on poprawny
      </p>
      <div className="mt-2 text-lg text-indigo-700 hover:underline">
        <Link to={"/"}>Strona główna</Link>
      </div>
    </section>
  );
};

export default PageNotFound;
