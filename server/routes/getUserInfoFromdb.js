
const express=require('express')

const router=express.Router()


const { isAuthenticated } =require ('../middleware/isAuth')

const getUserInfoFromdb =require('../controllers/getUserInfoFromdb')

router.get("/getUserInfoFromdb/:userid",getUserInfoFromdb)

module.exports=router