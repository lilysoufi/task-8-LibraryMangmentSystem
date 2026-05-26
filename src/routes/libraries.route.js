const express = require("express");
const router = express.Router();

const libraryController = require("../controllers/libraries.controller");
const asyncHandler = require("../utils/asyncHandler");
const id = require("../middlewares/id");

router.get("/", asyncHandler(libraryController.getAllLibraries));
router.get("/:id", id, asyncHandler(libraryController.getLibraryById));
router.post("/", asyncHandler(libraryController.createLibrary));
router.put("/:id", id, asyncHandler(libraryController.updateLibrary));
router.delete("/:id", id, asyncHandler(libraryController.deleteLibrary));

module.exports = router;