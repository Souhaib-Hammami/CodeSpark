
const express=require('express')

const router=express.Router()


const { isAuthenticated } =require ('../middleware/isAuth')

const renameFile=require('../controllers/renameFile')

router.post("/renameFile",renameFile)

module.exports=router