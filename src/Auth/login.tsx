import React, { useContext, useEffect } from "react";
import { useImmer } from "use-immer";
import AuthContext from "../contexts/AuthContext";

type LoginProps = {
  setLoading: React.Dispatch<React.SetStateAction<boolean>>;
};

const initialState = {
  email: "",
  password: "",
};

const Login = ({ setLoading }: LoginProps) => {
  const [data, setData] = useImmer(initialState);
  const auth = useContext(AuthContext);

  if (!auth) return <></>;
  const { logIn, loading, error } = auth;

  // USTAWIANIE GLOBALNEGO ŁADOWANIA
  useEffect(() => {
    setLoading(loading);
  }, [loading]);

  // LOGOWANIE
  const handleLogIn = async (e: any) => {
    e.preventDefault();
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
        {error && <p className="text-red-500 mt-2">Coś poszło nie tak</p>}
      </form>
    </div>
  );
};

export default Login;
