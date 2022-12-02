import React, { useContext, useState, useRef, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import AuthContext from "../contexts/AuthContext";
import { CheckIcon } from "@heroicons/react/24/outline";
import { Oval } from "react-loader-spinner";

const Settings = () => {
  const [image, setImage] = useState<File | undefined>(undefined);
  const [success, setSuccess] = useState(false);
  const displayNameRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();
  const auth = useContext(AuthContext);
  if (!auth) return <></>;
  const { user, updateDisplayName, updateProfileImage, deleteUser, loading, error } =
    auth;

  // PRZEKIEROWANIE JEŚLI UZYTKOWNIK JEST NIE ZALOGOWANY
  useEffect(() => {
    if (user === null)
      navigate("/auth", { state: { page: "login", redirect: "ustawienia" } });
  }, [user]);

  // RESETOWANIE INFORMACJI O POPRAWNYM ZAPISIE
  useEffect(() => {
    if (!success) return;
    const timeout = setTimeout(() => {
      setSuccess(false);
    }, 5000);

    timeout;
    return () => clearTimeout(timeout);
  }, [success]);

  // AKTUALIZACJA NAZWY UŻYTKOWNIKA
  const handlePhotoURLUpdate = async () => {
    if (!image) return;
    await updateProfileImage(image);
    setSuccess(true);
  };

  // AKTUALIZACJA ZDJĘCIA PROFILOWEGO UZYTKOWNIKA
  const handleDisplayNameUpdate = async () => {
    if (!displayNameRef.current) return;
    const displayName = displayNameRef.current.value;
    if (displayName.length < 4) return;
    await updateDisplayName(displayName);
    setSuccess(true);
  };

  const handleDeleteUser = async () => {
    await deleteUser();
  };

  return (
    <section id="content-wrapper">
      <section id="content-header">
        <h1>Ustawienia</h1>
        <div>
          <Link to={"/ustawienia"}>Ustawienia</Link>
          <Link to={"/dashboard"}>Dashboard</Link>
        </div>
      </section>
      <section id="content">
        {/* displayName */}
        <div className="setting-container">
          <h2>Twoja nazwa</h2>
          <p>
            Twój nickname widoczny w prawym rozwijanym menu, nazwa nie musi być unikatowa.
          </p>
          <div>
            <div className="input-with-label">
              <input type="text" defaultValue={user?.displayName} ref={displayNameRef} />
            </div>
            <button className="btn bg-indigo-700" onClick={handleDisplayNameUpdate}>
              Zapisz
            </button>
          </div>
        </div>
        {/* photoURL */}
        <div className="setting-container">
          <h2>Awatar</h2>
          <p>
            Obrazek widoczny w prawym górnym rogu, jest on odzwierciedleniem twojego
            nadchnienia.
          </p>
          <div>
            <div className="relative mb-5 flex items-center gap-10 overflow-hidden h-[50px]">
              <img
                src={image ? URL.createObjectURL(image) : user?.photoURL}
                alt="Twój awatar"
                className="rounded-full h-[50px] w-[50px] object-cover"
              />
              <div>
                <input
                  type="file"
                  multiple={false}
                  className="absolute opacity-0"
                  // @ts-ignore
                  onChange={e => setImage(e.target.files[0])}
                  accept="image/png, image/jpeg"
                />
                <h3 className="text-lg">Wybierz zdięcie</h3>
              </div>
            </div>
            <button className="btn bg-indigo-700" onClick={handlePhotoURLUpdate}>
              Zapisz
            </button>
          </div>
        </div>

        <div className="setting-container">
          <h2>Usuń konto</h2>
          <p>
            Twoje konto zostanie na stałe usunięte z bazy danych.{" "}
            <span className="text-red-500 underline">
              Podwójne kliknięcie w przycisk <span className="font-semibold">Usuń</span>{" "}
              spowoduję usunięcie konta!!
            </span>
          </p>
          <button className="btn bg-red-500" onDoubleClick={handleDeleteUser}>
            Usuń
          </button>
        </div>

        <span className="absolute top-5 right-4">
          {loading && <Oval height={40} color={"#4338CA"} secondaryColor={"#4338CA"} />}
          {error && <p className="text-red-500">Nie udało się zapisać zmian</p>}
          {!error && success && <CheckIcon className="h-9 text-green-500" />}
        </span>
      </section>
    </section>
  );
};

export default Settings;
