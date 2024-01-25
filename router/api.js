const express = require("express");
const { user_lms, mk_lms, report_mk_nasional } = require("../controller/bpr");

const router = express.Router();

router.get("/user_lms", user_lms);
router.get("/mk_lms", mk_lms);
router.get("/report_mk_nasional", report_mk_nasional);

module.exports = router;