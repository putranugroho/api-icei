const express = require("express");
const { user_lms, mk_lms } = require("../controller/bpr");

const router = express.Router();

router.get("/user_lms", user_lms);
router.get("/mk_lms", mk_lms);

module.exports = router;