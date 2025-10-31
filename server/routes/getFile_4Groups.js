const express=require('express')

const router =express.Router()



const { isAuthenticated } =require ('../middleware/isAuth')



const getFile_4Groups=require('../controllers/getFile_4Groups')


router.get("/handleGetFile_4Groups/:userId",isAuthenticated,getFile_4Groups)


module.exports=router