const express = require("express");
const router = express.Router();
const deleteGrp = require("../controllers/deleteGrp");

router.delete("/deleteGrp", deleteGrp);

module.exports = router;
