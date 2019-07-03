import express from "express";
import Properties from "../controllers/propertyControllers.js";
const router = express.Router();

//get all Properties adverts route
router.get("/", Properties.getAllProAdvert);

//get a specific Property advert route
router.get("/:propertyId", Properties.getSpecificProAdvert);

export default router;