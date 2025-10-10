
const express=require('express')

const router=express.Router()


const { isAuthenticated } =require ('../middleware/isAuth')

const allGroups=require('../controllers/allGroups')

router.get("/editor",isAuthenticated,allGroups)

module.exports=router