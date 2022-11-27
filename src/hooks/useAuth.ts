import { useState, useEffect } from "react";
import { useImmer } from "use-immer";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { storage } from "../../firebase/index";
import axios from "axios";
import User from "../types/User";

// tworzenie nowego uzytkownika
// logowanie
// pobieranie użytkownika po tokenie
// aktualizacja nazwy użytkownika
// aktualizacja zdjęcie profilowego

const PREFIX = "http://localhost:3000/api/auth/";
const CREATE_ACCOUNT_PATH = "create-account";
const LOGIN_PATH = "login";
const GET_USER_PATH = "user/";
const UPDATE_USER_PROFILE_IMAGE_PATH = "update-user-profile-image";
const UPDATE_USER_DISPLAY_NAME_PATH = "update-user-display-name";

type stateTypes = {
  user: null | User;
  loading: boolean;
  error: null | Error;
};

const initialState = {
  user: null,
  loading: false,
  error: null,
};

const useAuth = () => {
  const [state, setState] = useImmer<stateTypes>(initialState);

  // UPDATE USER
  const updateUser = (user: null | User) => {
    setState(state => {
      state.user = user;
    });
  };

  // START
  const start = () => {
    setState(state => {
      state.loading = true;
      state.error = null;
    });
  };

  // SUCCESS
  const success = () => {
    setState(state => {
      state.loading = false;
      state.error = null;
    });
  };

  // FAILURE
  const failure = () => {
    setState(state => {
      state.loading = false;
      state.error = new Error("Api fetch error");
    });
  };

  // GET USER AT FIRST RENDER
  useEffect(() => {
    getUser();
  }, []);

  // CREATE ACCOUNT
  const createAccount = async (displayName: string, email: string, password: string) => {
    try {
      start();
      const { data } = await axios.post(`${PREFIX}${CREATE_ACCOUNT_PATH}`, {
        displayName,
        email,
        password,
      });

      if (data) {
        console.log(data);
        success();
        updateUser(data);
        localStorage.setItem("token", data.token);
      } else {
        failure();
      }
    } catch (err) {
      failure();
      console.warn(err);
    }
  };

  // LOGIN
  const logIn = async (email: string, password: string) => {
    try {
      start();
      const { data } = await axios.post(`${PREFIX}${LOGIN_PATH}`, {
        email,
        password,
      });

      if (data) {
        success();
        updateUser(data);
        localStorage.setItem("token", data.token);
      } else {
        failure();
      }
    } catch (err) {
      failure();
      console.warn(err);
    }
  };

  // GET USER BY TOKEN
  const getUser = async () => {
    try {
      start();
      const token = localStorage.getItem("token");
      const { data } = await axios.get(`${PREFIX}${GET_USER_PATH}`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (data) {
        success();
        updateUser(data);
        localStorage.setItem("token", data.token);
      } else {
        failure();
      }
    } catch (err) {
      success();
      console.warn(err);
    }
  };

  // LOG OUT
  const logOut = async () => {
    localStorage.removeItem("token");
    updateUser(null);
  };

  // UPDATE PROFILE IMAGE
  const updateProfileImage = async (file: File) => {
    try {
      start();
      if (!state.user) return failure();
      const storageRef = ref(storage, state.user.id);
      const upload = await uploadBytes(storageRef, file);
      const url = await getDownloadURL(upload.ref);
      const { data } = await axios.patch(
        `${PREFIX}${UPDATE_USER_PROFILE_IMAGE_PATH}`,
        { photoURL: url },
        { headers: { Authorization: `Bearer ${state.user.token}` } }
      );
      success();
      updateUser(data);
    } catch (err) {
      failure();
      console.warn(err);
    }
  };

  // UPDATE DISPLAY NAME
  const updateDisplayName = async (displayName: string) => {
    try {
      start();
      if (!state.user) return failure();
      const { data } = await axios.patch(
        `${PREFIX}${UPDATE_USER_DISPLAY_NAME_PATH}`,
        { displayName },
        { headers: { Authorization: `Bearer ${state.user.token}` } }
      );
      success();
      updateUser(data);
    } catch (err) {
      failure();
      console.warn(err);
    }
  };

  const { user, loading, error } = state;

  return {
    user,
    loading,
    error,
    createAccount,
    logIn,
    getUser,
    logOut,
    updateProfileImage,
    updateDisplayName,
  } as const;
};

export default useAuth;
