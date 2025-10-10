
const express=require('express')

const router=express.Router()


const { isAuthenticated } =require ('../middleware/isAuth')

const createGroups =require('../controllers/createGroup')
const allGroups=require('../controllers/allGroups')

router.post("/groups",isAuthenticated,createGroups)
router.get("/groups",isAuthenticated,allGroups)

module.exports=router