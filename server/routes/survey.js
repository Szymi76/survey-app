import express from "express";

import getAllSurveyAnswers from "../controllers/getAllSurveyAnswers.js";
import getSurveyById from "../controllers/getSurveyById.js";
import uploadAnswer from "../controllers/uploadAnswer.js";
import uploadSurvey from "../controllers/uploadSurvey.js";
import verifyToken from "../middleware/auth.js";

const router = express.Router();

// GET
router.get("/:surveyID", getSurveyById);
router.get("/all-answers/:surveyID", verifyToken, getAllSurveyAnswers);

// POST
router.post("/upload-survey", verifyToken, uploadSurvey);
router.post("/upload-answer", uploadAnswer);

export default router;
