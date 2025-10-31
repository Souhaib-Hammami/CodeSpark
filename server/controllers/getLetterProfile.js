const {users}=require('../models/')



const getLetterProfile=async(req,res)=>{


    try {
            const id=Number(req.params.user_id)
            const name = await users.findByPk(id);
             
            if (name === null) {
            console.log('name Not found!');
            } 
            else {
            
                const firstTwoLetters = name.username[0] || "";
                // const secondLetter = name.username[1] || "";
                // const firstTwoLetters = firstLetter + secondLetter;
         
                     return res.status(200).send(firstTwoLetters);
                   }
  
    } catch (error) {
        
            console.log(error)
            return res.status(500).send("help")
    }
}

module.exports=getLetterProfile