const express = require("express");
const router = express.Router();

const loanController = require("../controllers/loans.controller");
const asyncHandler = require("../utils/asyncHandler");
const id = require("../middlewares/id");

router.get("/", asyncHandler(loanController.getAllLoans));

router.get("/fine/:id", [id], asyncHandler(loanController.calculateFine));

router.put("/return/:id", [id], asyncHandler(loanController.returnLoan));

router.get("/:id", [id], asyncHandler(loanController.getLoanById));

router.post("/", asyncHandler(loanController.createLoan));

router.put("/:id", [id], asyncHandler(loanController.updateLoan));

router.delete("/:id", [id], asyncHandler(loanController.deleteLoan));

module.exports = router;
