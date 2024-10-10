const express = require("express");
const carsController = require("../controllers/carsControllers");
const router = express.Router();

router.get("/", carsController.getAllCarsData);

router.get("/:id", carsController.getCarById);

router.post("/", carsController.createCarData);

router.put("/:id", carsController.editCarData);

router.delete("/:id", carsController.deleteCarData);

module.exports = router;
