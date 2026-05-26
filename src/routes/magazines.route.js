const express = require("express");
const router = express.Router();
const magazineController = require("../controllers/magazines.controller");
const asyncHandler = require("../utils/asyncHandler");
const id = require("../middlewares/id");

router.get("/", asyncHandler(magazineController.getAllMagazines));

router.get("/:id", [id], asyncHandler(magazineController.getMagazineById));

router.post("/", asyncHandler(magazineController.createMagazine));

router.put("/:id", [id], asyncHandler(magazineController.updateMagazine));

router.delete("/:id", [id], asyncHandler(magazineController.deleteMagazine));

module.exports = router;