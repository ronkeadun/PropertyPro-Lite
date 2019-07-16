import express from "express";
import Users from "../controllers/usersController.js";
const router = express.Router();


router.post("/auth/register", Users.registerUser)

router.post("/auth/login", Users.userLogin)


export default router;