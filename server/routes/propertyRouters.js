import express from "express";
import Properties from "../controllers/propertyControllers.js";
import auth from "../middleware/auth";
import upload from '../middleware/propertyMiddleware.js';

const router = express.Router();

//get all Properties adverts route
router.get("/", Properties.getAllProAdvert);

//get a specific Property advert route
router.get("/:propertyId", Properties.getSpecificProAdvert);

//get a all Property advert of a specific type
router.get("/:propertyId?type=propertyType", Properties.findProType);

//create Property advert route
router.post("/", Properties.createProAdvert);

//update a Property route
router.patch("/:propertyId", Properties.updateProAdvert);

//mark a Property as sold
router.patch("/:propertyId/sold", Properties.updateProStatus);

//delete a Property route
router.delete("/:propertyId", Properties.deleteSpecificRide);

export default router;