const express=require('express')

const router=express.Router()


const { isAuthenticated } =require ('../middleware/isAuth')


const getLetterProfile=require('../controllers/getLetterProfile')


router.get("/getLetterProfile/:user_id",isAuthenticated,getLetterProfile)


module.exports=router
