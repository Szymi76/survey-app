import { useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import AuthContext from "../contexts/AuthContext";

const useRedirect = (page: "login" | "create-account", redirect: string) => {
  const navigate = useNavigate();
  const auth = useContext(AuthContext);
  if (!auth) return;
  const { user } = auth;

  useEffect(() => {
    if (user === null) navigate("/auth", { state: { page, redirect } });
  }, [user]);
};

export default useRedirect;
