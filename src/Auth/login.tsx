import React, { useContext, useEffect, useState } from "react";
import { useImmer } from "use-immer";
import AuthContext from "../contexts/AuthContext";

const initialState = {
  email: "",
  password: "",
};

const Login = () => {
  const [data, setData] = useImmer(initialState);
  const auth = useContext(AuthContext);
  const [localError, setLocalError] = useState<null | string>(null);

  if (!auth) return <></>;
  const { logIn, loading, error } = auth;

  // LOGOWANIE
  const handleLogIn = async (e: any) => {
    e.preventDefault();
    let freshError = null;
    if (Object.values(data).some(val => val.trim() == ""))
      freshError = "Wszystkie powyższe pola są wymagane";

    setLocalError(freshError);
    if (freshError) return;
    await logIn(data.email, data.password);
  };

  // ZMIANA WARTOŚCI STATE-a
  const handleOnChange = (e: any) => {
    setData(data => {
      // @ts-ignore
      data[e.target.name] = e.target.value;
    });
  };

  return (
    <div className="page">
      <form className="page-content" onSubmit={handleLogIn}>
        <h1>Zaloguj się</h1>

        <div className="input-with-label">
          <label>Email</label>
          <input type="email" name="email" onChange={handleOnChange} />
        </div>

        <div className="input-with-label">
          <label>Hasło</label>
          <input type="password" name="password" onChange={handleOnChange} />
        </div>

        <button className="btn bg-indigo-700 btn-full">Zaloguj się</button>
        {localError && <p className="text-red-500 mt-2">{localError}</p>}
        {error && !localError && <p className="text-red-500 mt-2">Coś poszło nie tak</p>}
      </form>
    </div>
  );
};

export default Login;
