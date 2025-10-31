const express=require('express')

 const router=express.Router()


const getFiles4Editor=require('../controllers/getFiles4Editor')


const { isAuthenticated } =require ('../middleware/isAuth')


 router.post("/getFiles4Editor",isAuthenticated,getFiles4Editor)

 module.exports=router