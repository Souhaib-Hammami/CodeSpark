const express=require('express')
const router=express.Router()

const { isAuthenticated } =require ('../middleware/isAuth')

const joinGrp=require('../controllers/joinGrp')

router.post("/joinGrp",isAuthenticated,joinGrp)

module.exports=router