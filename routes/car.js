const express = require("express")
const router = express.Router()
const Car = require("../model/Cars")
const { getallcars, getCarbyId, deleteCar, updateCar, createCar } = require("../controllers/carcotnroller")


router.get("/", getallcars)
router.get("/:id", getCarbyId)
router.delete("/:id", deleteCar)
router.put("/:id", updateCar)
router.post("/", createCar)
module.exports = router



