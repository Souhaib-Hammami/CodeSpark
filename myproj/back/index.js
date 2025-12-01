const express=require("express")
const cors=require("cors")
const router=require("../back/routes/CodesRoutes.js")
const port=4000 

const app=express()

app.use(express.json())
app.use(cors())
app.use("/",router)

app.listen(port,()=>console.log("the backend server is working on port "+port))
