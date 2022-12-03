import React, { useContext, useEffect, useState } from "react";
import { useImmer } from "use-immer";
import AuthContext from "../contexts/AuthContext";

const initialState = {
  displayName: "",
  email: "",
  password: "",
  correctPassword: "",
};

const CreateAccount = () => {
  const [data, setData] = useImmer(initialState);
  const auth = useContext(AuthContext);
  const [localError, setLocalError] = useState<null | string>(null);

  if (!auth) return <></>;
  const { createAccount, loading, error } = auth;

  // VALIDACJA I TWORZENIE KONTA
  const handleCreateAccount = async (e: any) => {
    e.preventDefault();
    let freshError = null;
    const { displayName, password, correctPassword } = data;
    if (password.length < 5) freshError = "Hasło musi mieć co najmniej 5 znaków";
    if (password !== correctPassword) freshError = "Hasła nie są takie same";
    if (displayName.length < 4)
      freshError = "Twoja nazwa nie może być krótsza niż 4 znaki";
    if (Object.values(data).some(val => val.trim() == ""))
      freshError = "Wszystkie powyższe pola są wymagane";

    setLocalError(freshError);
    if (freshError) return;

    await createAccount(data.displayName, data.email, data.password);
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
      <form className="page-content" onSubmit={handleCreateAccount}>
        <h1>Stwórz konto</h1>

        <div className="input-with-label">
          <label>Twoja nazwa</label>
          <input type="text" name="displayName" onChange={handleOnChange} />
        </div>

        <div className="input-with-label">
          <label>Email</label>
          <input type="email" name="email" onChange={handleOnChange} />
        </div>

        <div className="input-with-label">
          <label>Hasło</label>
          <input type="password" name="password" onChange={handleOnChange} />
        </div>

        <div className="input-with-label">
          <label>Powtórz hasło</label>
          <input type="password" name="correctPassword" onChange={handleOnChange} />
        </div>

        <button className="btn bg-indigo-700 btn-full">Stwórz konto</button>
        {localError && <p className="text-red-500 mt-2">{localError}</p>}
        {error && !localError && <p className="text-red-500 mt-2">Coś poszło nie tak</p>}
      </form>
    </div>
  );
};

export default CreateAccount;
