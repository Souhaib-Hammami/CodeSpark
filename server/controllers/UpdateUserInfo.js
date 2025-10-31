
const { users } = require("../models");
const bcrypt = require("bcrypt");

const updateUserInfo = async (req, res) => {
  try {
    const { userId, username, email, bio, password_hash ,current_password } = req.body;

    if (!userId) {
      return res.status(400).json({ error: "User ID is required" });
    }

    const user = await users.findByPk(userId);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    if (username !== undefined && username !== user.username) {
      user.username = username;
    }

    if (email !== undefined && email !== user.email) {
      user.email = email;
    }

    if (bio !== undefined && bio !== user.bio) {
      user.bio = bio;
    }
    // if (current_password === user.password_hash && password_hash ){
    //        user.password_hash = password_hash;
    // }

    if (password_hash) {
      if (!current_password) {
        return res
        .status(400)
        .json({ error: "Current password is required to change your password" });
      }


  console.log("=== PASSWORD DEBUG ===");
  console.log("Current password from request:", current_password);
  console.log("Current password length:", current_password.length);
  console.log("Stored hash from DB:", user.password_hash);
  console.log("Stored hash length:", user.password_hash.length);
  
  const isSamePassword = await bcrypt.compare(current_password, user.password_hash);
  console.log("Password match result:", isSamePassword);
  console.log("===================");





    if (!isSamePassword) {
      return res.status(401).json({ message: "Incorrect password" });
    }


      // Hash the NEW password before saving
      const salt = await bcrypt.genSalt(12);
      user.password_hash = await bcrypt.hash(password_hash, salt);


    }



   
      // Plain-text version:
   

      // OR with bcrypt (uncomment if needed)
      /*
      const salt = await bcrypt.genSalt(10);
      user.password_hash = await bcrypt.hash(password_hash, salt);
      */
    

    await user.save();

    res
    .status(200)
    .json({
      success: true,
      message: "User updated successfully"
    });
  } catch (error) {
    console.error("Error updating user:", error);
    res.status(500).json({ error: "Failed to update user" });
  }
};

module.exports = updateUserInfo;















// const { users } = require("../models");
// // const bcrypt = require("bcryptjs"); 

// const updateUserInfo = async (req, res) => {
       

//   try {
//     const { userId, username, email, bio, password_hash } = req.body;
//     if (!userId) {
//       return res.status(400).json({ error: "User ID is required" });
//     }

//     const user = await users.findByPk(userId);
//     if (!user) {
//       return res.status(404).json({ error: "User not found" });
//     }

//     if (username) user.username = username;
//     if (email) user.email = email;
//     if (bio !== undefined) user.bio = bio;
  
//   ////////////////////
//     if (password_hash) user.password_hash = password_hash
//  //////////or with bcrypt////////////:   
//     // if (password_hash) {
//     //   const salt = await bcrypt.genSalt(10);
//     //   user.password_hash = await bcrypt.hash(password_hash, salt);
//     // }

//     await user.save();

//     res.status(200).json({
//       success: true,
//       message: "User updated successfully",
//       user,
//     });
//   } catch (error) {
//     console.error("Error updating user:", error);
//     res.status(500).json({ error: "Failed to update user" });
//   }
// };

// module.exports = updateUserInfo;
