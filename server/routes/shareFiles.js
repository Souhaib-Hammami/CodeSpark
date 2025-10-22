const express=require('express')

const router=express.Router()


const { isAuthenticated }  =require('../middleware/isAuth')
const sharedFiles=require('../controllers/shareFiles')

router.post("/shareFiles",isAuthenticated,sharedFiles)

module.exports=router