import React, { useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import AuthContext from "../contexts/AuthContext";

type UserMenuProps = {
  toggled: boolean;
  setToggled: React.Dispatch<React.SetStateAction<boolean>>;
};

const UserMenu = ({ toggled, setToggled }: UserMenuProps) => {
  const auth = useContext(AuthContext);
  if (!auth) return <></>;
  const { user, logOut } = auth;

  // SPRAWDZANIE CZY UZYTKOWNIK KLIKNĄŁ POZA LUB W JAKIŚ PRZYCISK
  useEffect(() => {
    const handleOnClick = (e: any) => {
      if (e.target.matches("svg") || e.target.matches("img")) return;
      if (!e.target.closest("#user-menu") || e.target.closest(".btn")) setToggled(false);
    };

    document.addEventListener("click", handleOnClick);
    return () => document.removeEventListener("click", handleOnClick);
  }, []);

  return (
    <>
      <div id="user-menu" className={toggled ? "user-menu-toggled" : ""}>
        {user ? (
          <>
            <div className="flex flex-col gap-10">
              <div className="border-b border-gray-300 pb-3">
                <p>{user.displayName}</p>
                <p>{user.email}</p>
              </div>
              <div className="flex flex-wrap gap-2 justify-center items-center">
                <button className="btn bg-indigo-700">
                  <Link to={"/dashboard"}>Dashboard</Link>
                </button>
                <button className="btn bg-indigo-700">
                  <Link to={"/ustawienia"}>Ustawienia</Link>
                </button>
              </div>
            </div>

            <div>
              <p id="log-out" onClick={async () => await logOut()}>
                Wyloguj się
              </p>
            </div>
          </>
        ) : (
          <div className="flex flex-wrap gap-2 justify-center">
            <button className="btn bg-indigo-700">
              <Link
                to={"/auth"}
                state={{ page: "create-account", redirect: location.hash }}
              >
                Stwórz konto
              </Link>
            </button>
            <button className="btn bg-indigo-700">
              <Link to={"/auth"} state={{ page: "login", redirect: location.hash }}>
                Zaloguj się
              </Link>
            </button>
          </div>
        )}
      </div>
    </>
  );
};
export default UserMenu;
