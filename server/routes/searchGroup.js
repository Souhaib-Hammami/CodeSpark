
const express=require('express')

const router=express.Router()


const { isAuthenticated } =require ('../middleware/isAuth')

const searchGroup=require('../controllers/searchGroup')

router.get("/searchGroup",searchGroup)

module.exports=router