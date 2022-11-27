import { useImmer } from "use-immer";
import { useRef } from "react";
import useAuth from "../hooks/useAuth";

const App = () => {
  const {
    user,
    loading,
    error,
    createAccount,
    logIn,
    getUser,
    logOut,
    updateProfileImage,
    updateDisplayName,
  } = useAuth();

  const [create, setCreate] = useImmer({ displayName: "", email: "", password: "" });
  const [login, setLogin] = useImmer({ email: "", password: "" });

  const fileInputRef = useRef<HTMLInputElement>(null);
  const displayNameInputRef = useRef<HTMLInputElement>(null);

  const handleCreateChange = (e: any) => {
    setCreate(create => {
      // @ts-ignore
      create[e.target.name] = e.target.value;
    });
  };

  const handleLoginChange = (e: any) => {
    setLogin(login => {
      // @ts-ignore
      login[e.target.name] = e.target.value;
    });
  };

  const handleCreateAccount = async (e: any) => {
    e.preventDefault();
    const { displayName, email, password } = create;
    await createAccount(displayName, email, password);
  };

  const handleLogin = async (e: any) => {
    e.preventDefault();
    const { email, password } = login;
    await logIn(email, password);
  };

  const handleImageChange = async () => {
    if (!fileInputRef.current?.files) return;
    const file = fileInputRef.current?.files[0];
    await updateProfileImage(file);
  };

  const handleDisplayNameChange = async () => {
    if (!displayNameInputRef.current) return;
    const displayName = displayNameInputRef.current.value;
    await updateDisplayName(displayName);
  };

  return (
    <>
      <form onSubmit={handleCreateAccount}>
        <h1>STWÓRZ KONTO</h1>
        <input
          type={"text"}
          name="displayName"
          placeholder="displayName"
          value={create.displayName}
          onChange={handleCreateChange}
        />
        <input
          type={"text"}
          name="email"
          placeholder="email"
          value={create.email}
          onChange={handleCreateChange}
        />
        <input
          type={"password"}
          name="password"
          placeholder="password"
          value={create.password}
          onChange={handleCreateChange}
        />
        <button type="submit">Stwórz</button>
      </form>
      <form onSubmit={handleLogin}>
        <h1>ZALOGUJ</h1>
        <input
          type={"text"}
          name="email"
          placeholder="email"
          value={login.email}
          onChange={handleLoginChange}
        />
        <input
          type={"password"}
          name="password"
          placeholder="password"
          value={login.password}
          onChange={handleLoginChange}
        />
        <button type="submit">Zaloguj się</button>
      </form>
      <h3>{user ? `${user.displayName}  <<< teraz zalogowany` : "Nie zalogowano"}</h3>
      <img src={user?.photoURL} alt="Zdjęcie profilowe" height={75} />
      <input type={"file"} ref={fileInputRef} multiple={false} />
      <button onClick={handleImageChange}>Zmień zdjęcie profilowe</button>
      <br />
      <input
        type={"text"}
        placeholder="Nowa nazwa użytkownika"
        ref={displayNameInputRef}
      />
      <button onClick={handleDisplayNameChange}>Zmień nazwę użytkownika</button>
      <h3>{loading ? "Ładowanie" : "Nic nie jest teraz ładowane"}</h3>
      <h3>{error ? "Błąd" : "Nie ma żadnych błędów"}</h3>
      <button onClick={async () => logOut()}>Wyloguj się</button>
    </>
  );
};

export default App;
