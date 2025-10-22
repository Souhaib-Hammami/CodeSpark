
const express=require('express')

const router=express.Router()


const { isAuthenticated } =require ('../middleware/isAuth')

const saveFile=require('../controllers/saveFile')

router.post("/saveFile",saveFile)

module.exports=router