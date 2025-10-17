
const express=require('express')

const router=express.Router()


const { isAuthenticated } =require ('../middleware/isAuth')

const deleteFile=require('../controllers/deleteFile')

router.delete("/deleteFile",isAuthenticated,deleteFile)

module.exports=router