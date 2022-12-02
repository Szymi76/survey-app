import express from "express";

import getAllSurveyAnswers from "../controllers/getAllSurveyAnswers.js";
import getSurveyById from "../controllers/getSurveyById.js";
import uploadAnswer from "../controllers/uploadAnswer.js";
import uploadSurvey from "../controllers/uploadSurvey.js";
import deleteSurveyById from "../controllers/deleteSurveyById.js";
import getAllUserSurveys from "../controllers/getAllUserSurveys.js";
import verifyToken from "../middleware/auth.js";

const router = express.Router();

// GET
router.get("/all-answers/:surveyID", verifyToken, getAllSurveyAnswers);
router.get("/all-user-surveys", verifyToken, getAllUserSurveys);
router.get("/:surveyID", getSurveyById);

// POST
router.post("/upload-survey", verifyToken, uploadSurvey);
router.post("/upload-answer", uploadAnswer);

// DELETE
router.delete("/delete/:surveyID", verifyToken, deleteSurveyById);

export default router;
