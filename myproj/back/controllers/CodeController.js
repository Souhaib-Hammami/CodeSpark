const {codes}=require("../models/codes.js")


const GetCode=async (req,res) => {
    try {
       const data = await codes.find({}) 
       res.send(data)
    } catch (error) {
        console.log(error)
    }
    
}

//////////////////////////////////////
const AddToCode=async (req,res) => {
    try {

        const data = await codes.create(req.body)
            res.send(data)
    } catch (error) {
        console.log(error)
    }
    
}


//////////////////////////////////////


const DeleteCode=async (req,res) => {
    try {
        const{id}=req.params
        const data=await codes.findByIdAndDelete(id)
        res.send(data)
    } catch (error) {
        console.log(error)
    }
    
}



const UpdateCode=async (req,res) => {
    try {
        const{id}=req.params
        const body=req.body
        
         const data= await codes.findByIdAndUpdate(id,body) 
         res.send(data)
    } catch (error) {
        console.log(error)
    }
    
}


//////////////////////////////////////

module.exports={GetCode,AddToCode,DeleteCode,UpdateCode}