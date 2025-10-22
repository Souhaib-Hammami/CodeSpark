const express = require("express");
const router = express.Router();



const { isAuthenticated } =require ('../middleware/isAuth')

const getLocalFileContent = require("../controllers/getLocalFileContent");

router.post("/getLocalFileContent", getLocalFileContent);

module.exports = router;


