const express = require("express");
const router = express.Router();



const { isAuthenticated } =require ('../middleware/isAuth')

const getFileContent = require("../controllers/getFileContent");

router.get("/getFileContent/:id", getFileContent);

module.exports = router;
