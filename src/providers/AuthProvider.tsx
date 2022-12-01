import React from "react";
import useAuth from "../hooks/useAuth";
import AuthContext from "../contexts/AuthContext";

const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const {
    user,
    loading,
    error,
    logIn,
    createAccount,
    logOut,
    getUser,
    updateDisplayName,
    updateProfileImage,
    deleteUser,
  } = useAuth();

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        error,
        logIn,
        createAccount,
        logOut,
        getUser,
        updateDisplayName,
        updateProfileImage,
        deleteUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
