const {GetCode,AddToCode,DeleteCode,UpdateCode}=require("../controllers/CodeController")

const express=require("express")
const router=express.Router()

router.get("/get",GetCode)
router.post("/add",AddToCode)
router.put("/:id",UpdateCode)
router.delete("/:id",DeleteCode)

module.exports=router