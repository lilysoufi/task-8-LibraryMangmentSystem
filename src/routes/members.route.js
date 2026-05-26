const express = require("express");
const router = express.Router();

const membersController = require("../controllers/members.controller");
const asyncHandler = require("../utils/asyncHandler");
const id = require("../middlewares/id");

router.get("/", asyncHandler(membersController.getAllMembers));

router.post("/", asyncHandler(membersController.createMember));

router.get("/:id", [id], asyncHandler(membersController.getMemberById));

router.put("/:id", [id], asyncHandler(membersController.updateMember));

router.delete("/:id", [id], asyncHandler(membersController.deleteMember));

module.exports = router;