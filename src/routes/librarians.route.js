const express = require("express");
const router = express.Router();

const librarianController = require("../controllers/librarians.controller");
const asyncHandler = require("../utils/asyncHandler");
const id = require("../middlewares/id");

router.get("/", asyncHandler(librarianController.getAllLibrarians));

router.get("/:id", [id], asyncHandler(librarianController.getLibrarianById));

router.post("/", asyncHandler(librarianController.createLibrarian));

router.put("/:id", [id], asyncHandler(librarianController.updateLibrarian));

router.delete("/:id", [id], asyncHandler(librarianController.deleteLibrarian));

module.exports = router;