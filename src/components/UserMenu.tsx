import React, { useContext } from "react";
import { Link } from "react-router-dom";
import AuthContext from "../contexts/AuthContext";

const UserMenu = ({ toggled }: { toggled: boolean }) => {
  const auth = useContext(AuthContext);
  if (!auth) return <></>;
  const { user, loading, error, logIn, logOut } = auth;

  return (
    <>
      {true ? (
        <div id="user-menu" className={toggled ? "user-menu-toggled" : ""}>
          {/* górna część menu */}
          <div className="flex flex-col gap-10">
            {/* nazawa użytkownika i email */}
            <div className="border-b border-gray-300 pb-3">
              <p>Adam</p>
              <p>adam2@gmail.com</p>
              {/* <p>{user.displayName}</p>
              <p>{user.email}</p> */}
            </div>
            {/* linki to dashborda i ustawień */}
            <div className="flex flex-wrap gap-2 justify-center items-center">
              <button className="btn bg-indigo-700">
                <Link to={"/dashboard"}>Dashboard</Link>
              </button>
              <button className="btn bg-indigo-700">
                <Link to={"/ustawienia"}>Ustawienia</Link>
              </button>
            </div>
          </div>
          {/* wyloguj się */}
          <div>
            <p id="log-out" onClick={() => 1 /* wyloguj sie */}>
              Wyloguj się
            </p>
          </div>
        </div>
      ) : (
        <>
          <Link to={"/auth"}>Zaloguj się</Link>
          <Link to={"/auth"}>Stwórz konto</Link>
        </>
      )}
    </>
  );
};
export default UserMenu;
