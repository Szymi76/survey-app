import React, { useContext, useRef } from "react";
import { Oval } from "react-loader-spinner";
import AuthContext from "../contexts/AuthContext";

type DeleteUserModalProps = {
  show: boolean;
  setShow: React.Dispatch<React.SetStateAction<boolean>>;
};

const DeleteUserModal = ({ show, setShow }: DeleteUserModalProps) => {
  const confirmTextRef = useRef<HTMLInputElement>(null);
  const auth = useContext(AuthContext);
  if (!auth) return <></>;
  const { user, deleteUser, loading, error } = auth;

  const handleDeleteUser = async () => {
    if (!confirmTextRef.current) return;
    const text = confirmTextRef.current.value;
    if (text !== user?.displayName) return;
    await deleteUser();
  };

  return (
    <>
      {show && (
        <section id="publish-modal-wrapper">
          <div id="publish-modal">
            <h1>Czy na pewno chcesz usunąć swoje konto?</h1>
            <p>
              Aby usunąć konto należy wpisać poniżej{" "}
              <span className="text-black font-bold">{user?.displayName}</span> i następnie kliknąć{" "}
              <span className="text-red-500 font-semibold">Usuń.</span>
              <span className="text-red-500 underline">
                {" "}
                Operacja jest nieodwracalna, twoje konto zostanie na stałę usunięte z bazy dancyh!!
              </span>
            </p>

            <div className="input-with-label max-w-[250px] input-red">
              <input type="text" ref={confirmTextRef} />
            </div>

            <div className="publish-row">
              <>
                {loading ? (
                  <Oval color="#4338CA" secondaryColor="#4338CA" height={30} />
                ) : (
                  <>
                    <button className="btn bg-indigo-700" onClick={() => setShow(false)}>
                      Cofnij
                    </button>
                    <button className="btn bg-red-500" onClick={handleDeleteUser}>
                      Usuń
                    </button>
                  </>
                )}
              </>
            </div>
          </div>
        </section>
      )}
    </>
  );
};

export default DeleteUserModal;
