const mongoose=require("mongoose")
// CTC CSM
mongoose.connect("mongodb://localhost:27017/codes")

    .then(

    ()=>{ console.log("connected to database")}
    )
    .catch(
        (error)=> { console.log(error)}
    )

const CodesSchema=mongoose.Schema(
    {
        code:String,
        filename :String
    }
)

const codes=mongoose.model("codes",CodesSchema)

module.exports={codes}