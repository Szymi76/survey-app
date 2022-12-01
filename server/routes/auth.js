import express from "express";
import verifyToken from "../middleware/auth.js";

import createAccount from "../controllers/createAccount.js";
import login from "../controllers/login.js";
import getUserById from "../controllers/getUserById.js";
import updateUserProfieImage from "../controllers/updateUserProfieImage.js";
import updateUserDisplayName from "../controllers/updateUserDisplayName.js";
import deleteUserById from "../controllers/deleteUserById.js";

const router = express.Router();

// POST
router.post("/create-account", createAccount);
router.post("/login", login);

// GET
router.get("/user", verifyToken, getUserById);

// PATCH
router.patch("/update-user-profile-image", verifyToken, updateUserProfieImage);
router.patch("/update-user-display-name", verifyToken, updateUserDisplayName);

// DELETE
router.delete("/deleteUser", verifyToken, deleteUserById);

export default router;
