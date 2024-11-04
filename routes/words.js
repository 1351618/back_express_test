const express = require("express");
const { words } = require("../controllers/words");
const router = express.Router();

router.get("/", words);

module.exports = router;
