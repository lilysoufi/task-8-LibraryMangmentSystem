const express = require("express");
const router = express.Router();

const bookController = require("../controllers/books.controller");
const asyncHandler = require("../utils/asyncHandler");
const id = require("../middlewares/id");

router.get("/",  asyncHandler(bookController.getAllBooks));

router.get("/:id", [id], asyncHandler(bookController.getBookById));

router.post("/", asyncHandler(bookController.createBook));

router.put("/:id", [id], asyncHandler(bookController.updateBook));

router.delete("/:id", [id], asyncHandler(bookController.deleteBook));

module.exports = router;