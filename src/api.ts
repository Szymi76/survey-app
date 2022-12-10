const ORIGIN = import.meta.env.DEV ? `http://192.168.1.10:3000/api/` : `${location.origin}/api/`;

const CREATE_ACCOUNT_URL = `${ORIGIN}auth/create-account`;
const LOGIN_URL = `${ORIGIN}auth/login`;
const GET_USER_URL = `${ORIGIN}auth/user/`;
const UPDATE_USER_PROFILE_IMAGE_URL = `${ORIGIN}auth/update-user-profile-image`;
const UPDATE_USER_DISPLAY_NAME_URL = `${ORIGIN}auth/update-user-display-name`;
const DELETE_USER_URL = `${ORIGIN}auth/deleteUser/`;
const UPLOAD_SURVEY_URL = `${ORIGIN}survey/upload-survey`;
const UPLOAD_ANSWER_URL = `${ORIGIN}survey/upload-answer`;
const GET_SURVEY_URL = `${ORIGIN}survey/`;
const DELETE_SURVEY_URL = `${ORIGIN}survey/delete/`;
const GET_ALL_SURVEYS = `${ORIGIN}survey/all-user-surveys`;
const GET_ALL_SURVEY_ANSWERS_URL = `${ORIGIN}survey/all-answers/`;

export default {
  CREATE_ACCOUNT_URL,
  GET_USER_URL,
  ORIGIN,
  GET_SURVEY_URL,
  LOGIN_URL,
  UPDATE_USER_DISPLAY_NAME_URL,
  UPDATE_USER_PROFILE_IMAGE_URL,
  UPLOAD_ANSWER_URL,
  UPLOAD_SURVEY_URL,
  DELETE_USER_URL,
  DELETE_SURVEY_URL,
  GET_ALL_SURVEYS,
  GET_ALL_SURVEY_ANSWERS_URL,
};
