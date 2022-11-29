import React, { useContext } from "react";
import { DocumentTextIcon, EllipsisVerticalIcon } from "@heroicons/react/24/solid";
import { Link } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import AuthContext from "../contexts/AuthContext";
import { useNavigate } from "react-router-dom";

const Nav = () => {
  const auth = useContext(AuthContext);
  if (!auth) return <></>;

  const { user, logIn } = auth;

  const navigate = useNavigate();

  return (
    <nav>
      <Link to={"/"}>
        <DocumentTextIcon className="h-8" />
        <h1>Ankieta na teraz</h1>
      </Link>
      <div id="details">
        {user ? (
          <>
            <EllipsisVerticalIcon className="h-8" />
            <img src={user?.photoURL} alt="profile image" />
          </>
        ) : (
          // <h3 onClick={async () => await logIn("szymonkrupa2@o2.pl", "1qaz@WSX")}>
          //   Zaloguj się
          // </h3>
          <h3 onClick={() => navigate("/auth")}>Zaloguj się</h3>
        )}
      </div>
    </nav>
  );
};

export default Nav;
