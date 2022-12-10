import React, { useEffect, useState, useContext } from "react";
import { Oval } from "react-loader-spinner";
import { useLocation, useNavigate } from "react-router-dom";
import Login from "./login";
import CreateAccount from "./createAccount";
import AuthContext from "../../contexts/AuthContext";

const Auth = () => {
  const { state } = useLocation(); // page, redirect
  const [page, setPage] = useState<"login" | "create-account">(state?.page ?? "login");
  const navigate = useNavigate();
  const auth = useContext(AuthContext);
  if (!auth) return <></>;
  const { user, loading } = auth;

  // ŚCIEŻKA PZEKIEROWANIA
  const redirect = state?.redirect.replaceAll("#/", "") ?? "";
  useEffect(() => {
    if (user) navigate(`/${redirect}`);
  }, [user]);

  return (
    <section id="auth-wrapper">
      <section id="auth">
        {/* SELEKTOR */}
        <div id="auth-selector">
          <div className={page == "login" ? "selected-auth" : ""} onClick={() => setPage("login")}>
            Zaloguj się
          </div>
          <div
            className={page == "create-account" ? "selected-auth" : ""}
            onClick={() => setPage("create-account")}>
            Swtórz konto
          </div>
        </div>
        {/* KONTENER */}
        <div
          id="auth-container"
          className={
            page == "create-account" ? "translate-for-create-account" : "translate-for-login"
          }>
          <div id="pages-container">
            <Login />
            <CreateAccount />
          </div>
        </div>
        {loading && (
          <div className="auth-loading">
            <Oval height={60} color={"#4338CA"} secondaryColor={"#4338CA"} />
          </div>
        )}
      </section>
    </section>
  );
};

export default Auth;
