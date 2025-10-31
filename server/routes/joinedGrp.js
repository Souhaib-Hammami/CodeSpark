const express=require('express')
const router=express.Router()

const { isAuthenticated } =require ('../middleware/isAuth')

const joinedGrp=require('../controllers/joinedGrp')

router.get("/:userId",joinedGrp)

module.exports=router