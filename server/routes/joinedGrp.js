const express=require('express')
const router=express.Router()

const { isAuthenticated } =require ('../middleware/isAuth')

const joinedGrp=require('../controllers/joinedGrp')

router.get("/:userId",isAuthenticated,joinedGrp)

module.exports=router