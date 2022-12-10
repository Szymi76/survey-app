import React, { useContext, useState, useRef } from "react";
import { Link } from "react-router-dom";
import AuthContext from "../../contexts/AuthContext";
import { CheckIcon } from "@heroicons/react/24/outline";
import { Oval } from "react-loader-spinner";
import InfoModal from "../../components/InfoModal";
import { XMarkIcon } from "@heroicons/react/24/solid";
import useReset from "../../hooks/useReset";
import useRedirect from "../../hooks/useRedirect";
import DeleteUserModal from "./DeleteUserModal";

const Settings = () => {
  const [image, setImage] = useState<File | undefined>(undefined);
  const [message, setMessage] = useState({ text: "", ok: true });
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const displayNameRef = useRef<HTMLInputElement>(null);

  // RESETOWANIE STATE-a PO 4 SEKDUNACH ABY ZRESETOWAĆ MODALA
  useReset(4000, () => setMessage({ text: "", ok: false }), [message]);

  // PRZEKIEROWYWANIE NIEZALOGOWANEGO UŻYTKOWNIAK
  useRedirect("login", "ustawienia");

  const auth = useContext(AuthContext);
  if (!auth) return <></>;
  const { user, updateDisplayName, updateProfileImage, deleteUser, loading, error } = auth;

  // AKTUALIZACJA ZDJĘCIA PROFILOWEGO UZYTKOWNIKA
  const handlePhotoURLUpdate = async () => {
    if (!image) {
      setMessage({ text: "Nie wybrano żadnego zdjęcia", ok: false });
      return;
    }
    await updateProfileImage(image);
    setMessage({ text: "Zaktualizowano zdjęcie profilowe", ok: true });
  };

  // AKTUALIZACJA NAZWY UŻYTKOWNIKA
  const handleDisplayNameUpdate = async () => {
    if (!displayNameRef.current) return;
    const displayName = displayNameRef.current.value.trim();
    const pattern = /^[a-zA-Z0-9]*$/g;
    const valid = pattern.test(displayName);
    if (!valid) {
      setMessage({ text: "Nazwa zawiera nie dozwolone znaki", ok: false });
      return;
    }

    if (displayName.length < 4) {
      setMessage({ text: "Nazwa użytkownika nie może być krótsza niż 4 znaki", ok: false });
      return;
    }
    await updateDisplayName(displayName);
    setMessage({ text: "Zaktualizowano nazwę użytkownika", ok: true });
  };

  // USUWANIE UZYTKOWNIKA
  const handleDeleteUser = () => {
    setShowDeleteModal(true);
    // await deleteUser();
  };

  return (
    <>
      <section id="content-wrapper">
        <section id="content-header">
          <h1>Ustawienia</h1>
          <div>
            <Link to={"/ustawienia"}>Ustawienia</Link>
            <Link to={"/dashboard"}>Dashboard</Link>
          </div>
        </section>
        <section id="content">
          {/* NAZWA UŻYTKOWNIKA */}
          <div className="setting-container">
            <h2>Twoja nazwa</h2>
            <p>Twój nickname widoczny w prawym rozwijanym menu, nazwa nie musi być unikatowa.</p>
            <div>
              <div className="input-with-label">
                <input type="text" defaultValue={user?.displayName} ref={displayNameRef} />
              </div>
              <button className="btn bg-indigo-700" onClick={handleDisplayNameUpdate}>
                Zapisz
              </button>
            </div>
          </div>
          {/* ZDJĘCIE PROFILOWE */}
          <div className="setting-container">
            <h2>Awatar</h2>
            <p>
              Obrazek widoczny w prawym górnym rogu, jest on odzwierciedleniem twojego nadchnienia.
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
                    onChange={(e) => setImage(e.target.files[0])}
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

          {/* USUWANIE KONTA */}
          <div className="setting-container">
            <h2>Usuń konto</h2>
            <p>
              Twoje konto zostanie na stałe usunięte z bazy danych.{" "}
              <span className="text-red-500 underline">
                Kliknięcie w przycisk <span className="font-semibold">Usuń</span> spowoduję
                przeniesienie do okna gdzie usuniesz swoje konto.
              </span>
            </p>
            <button className="btn bg-red-500" onClick={handleDeleteUser}>
              Usuń
            </button>
          </div>

          <span className="absolute top-5 right-4">
            {loading && <Oval height={40} color={"#4338CA"} secondaryColor={"#4338CA"} />}
          </span>
        </section>
        {/* ANIMOWANY MODAL AKTYWOWANY PODCZAS ZMIANNY USTAWIEŃ */}
        {message.text != "" && (
          <InfoModal>
            <div className="flex gap-2 text-lg">
              <p>{message.text}</p>
              {message.ok ? (
                <CheckIcon className="h-6 text-green-500" />
              ) : (
                <XMarkIcon className="h-6 text-red-500" />
              )}
            </div>
          </InfoModal>
        )}
      </section>
      <DeleteUserModal show={showDeleteModal} setShow={setShowDeleteModal} />
    </>
  );
};

export default Settings;
