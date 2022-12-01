import React, { useContext, useState } from "react";
import { DocumentTextIcon, EllipsisVerticalIcon } from "@heroicons/react/24/solid";
import { Link } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import AuthContext from "../contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import UserMenu from "./UserMenu";

const Nav = () => {
  const [toggled, setToggled] = useState(false);
  const auth = useContext(AuthContext);
  if (!auth) return <></>;

  const { user, logIn } = auth;

  const navigate = useNavigate();

  return (
    <>
      <nav>
        <Link to={"/"}>
          <DocumentTextIcon className="h-8" />
          <h1>Ankieta na teraz</h1>
        </Link>
        <div id="details">
          {user ? (
            <>
              <img
                src={user?.photoURL}
                alt="profile image"
                className="cursor-pointer"
                onClick={() => setToggled(!toggled)}
              />
            </>
          ) : (
            <h3
              className="hidden sm:block"
              onClick={() =>
                navigate("/auth", { state: { page: "login", redirect: location.hash } })
              }
            >
              Zaloguj się
            </h3>
          )}
          <EllipsisVerticalIcon
            className="h-8 cursor-pointer"
            onClick={() => setToggled(!toggled)}
          />
        </div>
      </nav>
      <UserMenu toggled={toggled} setToggled={setToggled} />
    </>
  );
};

export default Nav;
