
const express=require('express')

const router=express.Router()


const { isAuthenticated } =require ('../middleware/isAuth')

const updateUserInfo=require('../controllers/updateUserInfo')

router.post("/updateUserInfo",updateUserInfo)

module.exports=router