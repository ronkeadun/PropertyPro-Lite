import express from "express";
import Users from "../controllers/usersController.js";
const router = express.Router();


router.post("/signup", Users.registerUser)

router.post("/signin", Users.userLogin)


export default router;