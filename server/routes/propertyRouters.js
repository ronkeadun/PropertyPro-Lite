import express from "express";
import Properties from "../controllers/propertyControllers.js";
import auth from "../middleware/auth";

const router = express.Router();

//get all Properties adverts route
router.get("/", auth, Properties.getAllProAdvert);

//get a specific Property advert route
router.get("/:propertyId", auth, Properties.getSpecificProAdvert);

//get a all Property advert of a specific type
router.get("/:propertyId?type=propertyType", Properties.findProType);

//create Property advert route
router.post("/", auth, Properties.createProAdvert);

//update a Property route
router.patch("/:propertyId", auth, Properties.updateProAdvert);

//mark a Property as sold
router.patch("/:propertyId/sold", auth, Properties.updateProStatus);

//delete a Property route
router.delete("/:propertyId", auth, Properties.deleteSpecificRide);

export default router;