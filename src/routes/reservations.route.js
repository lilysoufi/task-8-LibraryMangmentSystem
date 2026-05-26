const express = require("express");
const router = express.Router();

const reservationController = require("../controllers/reservations.controller");
const asyncHandler = require("../utils/asyncHandler");
const id = require("../middlewares/id");

router.get("/", asyncHandler(reservationController.getAllReservations));
router.get("/:id",[id], asyncHandler(reservationController.getById));
router.post("/", asyncHandler(reservationController.createReservation));
router.put("/:id",[id], asyncHandler(reservationController.updateReservation));
router.patch("/cancel/:id",[id], asyncHandler(reservationController.cancelReservation));
router.patch("/complete/:id",[id], asyncHandler(reservationController.completeReservation));
router.delete("/:id",[id], asyncHandler(reservationController.removeReservation));

module.exports = router;