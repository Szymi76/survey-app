import { useState, useRef } from "react";
import { Link } from "react-router-dom";
import IlustrationImage from "../assets/Form.png";
import { useNavigate } from "react-router-dom";
import useFetch from "../hooks/useFetch";

const Home = () => {
  const [error, setError] = useState(false);
  const urlRef = useRef<HTMLInputElement>(null);

  const navigate = useNavigate();

  const handleRedirect = () => {
    const surveyID = urlRef.current?.value;
    if (surveyID?.length == 0) {
      setError(true);
      return;
    }
    navigate(`/ankieta/${surveyID}`);
  };

  return (
    <>
      <section id="front">
        <div>
          <h1>Ankieta na teraz</h1>
          <h2>Najszybsza metoda tworzenia ankiet</h2>
          <h4>Stań na wysokości zadania i stwórz najlepsze ankiety już teraz.</h4>
          <span>
            <Link to={"/kreator"}>
              <button className="btn bg-indigo-700 btn-rounded">Stwórz</button>
            </Link>
            <button className="btn bg-indigo-700 btn-rounded">Adres URL</button>
          </span>
        </div>
        <img src={IlustrationImage} alt="Form image" />
      </section>
      <section id="url">
        <h1>Adres URL ankiety</h1>
        <div className="container">
          <div id="home-url-input">
            <div>ID</div>
            <input type="text" placeholder="np. 63864b22467a776ec777607a" ref={urlRef} />
            <button onClick={handleRedirect}>Przejdź</button>
          </div>
        </div>
        <p>
          Należy umieścić skopiowany adres URL ankiety, a następnie nacisnąć{" "}
          <span className="text-indigo-700">Przejdź</span> aby znaleść się w ankiecie.
          {error && (
            <h6 className="text-red-500 text-left mt-2">
              * ID zostało wpisane błędnie *
            </h6>
          )}
        </p>
      </section>
    </>
  );
};

export default Home;
