const { users } = require('../models');

const login = async (req, res) => {
  const username = req.body.username;
  const password = req.body.password_hash;
  console.log("username : " + username )
  console.log("password : "+ password )

  try {
  
    const user = await users.findOne({ where: { username: username } });
        
        if (user === null) {
        return res.status(400).json({ message: "username is not valid" });
        }


        const isSamePassword = password === user.password_hash;

        //console.log(isSamePassword)

        if (isSamePassword === false) {
          
        return res.status(400).json({ message: "Incorrect password" });
        //return res.json({ message: "Incorrect password" });
        }
        
        
        return res.status(200).json({message: "Login successful",user}); 
    
   

  } catch (error) {
    return res.status(500).json({message: "An error occurred during login",error: error.message});
  }
};


module.exports=login



