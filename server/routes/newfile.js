
const express=require('express')

const router=express.Router()


const { isAuthenticated } =require ('../middleware/isAuth')

const newfile=require('../controllers/newfile')

router.post("/newfile",isAuthenticated,newfile)

module.exports=router