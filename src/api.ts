//----- PRODUCTION -----\\
const ORIGIN = `${location.origin}/api/`;
//----- DEVELOPMENT -----\\
// const ORIGIN = `http://localhost:3000/api/`;

const CREATE_ACCOUNT_URL = `${ORIGIN}auth/create-account`;
const LOGIN_URL = `${ORIGIN}auth/login`;
const GET_USER_URL = `${ORIGIN}auth/user/`;
const UPDATE_USER_PROFILE_IMAGE_URL = `${ORIGIN}auth/update-user-profile-image`;
const UPDATE_USER_DISPLAY_NAME_URL = `${ORIGIN}auth/update-user-display-name`;
const UPLOAD_SURVEY_URL = `${ORIGIN}survey/upload-survey`;
const UPLOAD_ANSWER_URL = `${ORIGIN}survey/upload-answer`;
const GET_SURVEY_URL = `${ORIGIN}survey/`;

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
};
