const express = require("express");
const router = express.Router();

const reviewController = require("../controllers/reviews.controller");
const asyncHandler = require("../utils/asyncHandler");
const id = require("../middlewares/id");

router.get("/", asyncHandler(reviewController.getAllReviews));
router.get("/:id", [id], asyncHandler(reviewController.getReviewById));
router.post("/", asyncHandler(reviewController.createReview));
router.put("/:id", [id], asyncHandler(reviewController.updateReview));
router.delete("/:id", [id], asyncHandler(reviewController.deleteReview));

module.exports = router;
