import React, { useState, useContext } from "react";
import { useImmer } from "use-immer";
import useAuth from "../hooks/useAuth";
import AuthContext from "../contexts/AuthContext";

const Auth = () => {
  const [login, setLogin] = useImmer({ email: "", password: "" });
  const [create, setCreate] = useImmer({ displayName: "", email: "", password: "" });

  const auth = useContext(AuthContext);
  if (!auth) return;

  const { user, createAccount, logIn, logOut, loading, error } = auth;

  const handleLoginChange = (e: any) => {
    setLogin(login => {
      // @ts-ignore
      login[e.target.name] = e.target.value;
    });
  };
  const handleCreateChange = (e: any) => {
    setCreate(create => {
      // @ts-ignore
      create[e.target.name] = e.target.value;
    });
  };

  return (
    <div className="auth-prim">
      <div>
        <h1>ZALOGUJ SIĘ</h1>
        <input
          type={"email"}
          name="email"
          placeholder="Email"
          onChange={handleLoginChange}
        />
        <input
          type={"password"}
          name="password"
          placeholder="Password"
          onChange={handleLoginChange}
        />
        <button onClick={async () => await logIn(login.email, login.password)}>
          ZALOGUJ SIĘ
        </button>
      </div>
      <div>
        <h1>STWÓRZ</h1>
        <input
          type={"text"}
          name="displayName"
          placeholder="Display name"
          onChange={handleCreateChange}
        />
        <input
          type={"email"}
          name="email"
          placeholder="Email"
          onChange={handleCreateChange}
        />
        <input
          type={"password"}
          name="password"
          placeholder="Password"
          onChange={handleCreateChange}
        />
        <button
          onClick={async () =>
            await createAccount(create.displayName, create.email, create.password)
          }
        >
          STWÓRZ KONTO
        </button>
      </div>
      <h3>ŁADOWANIE - {loading ? "TAK" : "NIE"}</h3>
      <h3>BŁĄD - {error ? "TAK" : "NIE"}</h3>

      <button onClick={async () => await logOut()}>WYLOGUJ SIĘ</button>
      <p>--{login.email}</p>
      <p>
        --
        {Array(login.password.length)
          .fill(0)
          .map((e, i) => "*")}
      </p>
      <p>--{create.displayName}</p>
      <p>--{create.email}</p>
      <p>
        --
        {Array(create.password.length)
          .fill(0)
          .map((e, i) => "*")}
      </p>
      <h4>{user ? "ZALOGOWANO" : "NIE ZALOGOWANO"}</h4>
    </div>
  );
};

export default Auth;
