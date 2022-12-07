import { useState, useEffect } from "react";
import { useImmer } from "use-immer";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { storage } from "../../firebase/index";
import axios from "axios";
import User from "../types/User";
import API from "../api";

type stateTypes = {
  user: null | undefined | User;
  loading: boolean;
  error: null | Error;
};

const initialState = {
  user: undefined,
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
  const failure = (err: any = null) => {
    console.log(err);
    setState(state => {
      state.loading = false;
      state.error = new Error(err ? err.response.data.message : "Coś poszło nie tak");
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
      const { data } = await axios.post(API.CREATE_ACCOUNT_URL, {
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
      failure(err);
      console.warn(err);
    }
  };

  // LOGIN
  const logIn = async (email: string, password: string) => {
    try {
      start();
      const { data } = await axios.post(API.LOGIN_URL, {
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
      failure(err);
      console.warn(err);
    }
  };

  // GET USER BY TOKEN
  const getUser = async () => {
    try {
      start();
      const token = localStorage.getItem("token");
      const { data } = await axios.get(API.GET_USER_URL, {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (data) {
        success();
        updateUser(data);
        localStorage.setItem("token", data.token);
      } else {
        failure();
        updateUser(null);
      }
    } catch (err) {
      success();
      updateUser(null);
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
        API.UPDATE_USER_PROFILE_IMAGE_URL,
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
        API.UPDATE_USER_DISPLAY_NAME_URL,
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

  const deleteUser = async () => {
    try {
      start();
      if (!state.user) return failure();
      await axios.delete(API.DELETE_USER_URL, {
        headers: { Authorization: `Bearer ${state.user.token}` },
      });
      success();
      localStorage.removeItem("token");
      updateUser(null);
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
    deleteUser,
  } as const;
};

export default useAuth;
