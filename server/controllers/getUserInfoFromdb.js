const { users } = require('../models');

const getUserInfoFromdb = async (req, res) => {
  try {
    const userid = Number(req.params.userid); 
    


    console.log("Requested user ID:", userid); // 🔹 Add this to debug

    const userInfo = await users.findByPk(userid);
    console.log("Found user:", userInfo); // 🔹 Debug

    res.status(200).send(userInfo);
  } catch (error) {
    console.error(error); // 🔹 Debug
    res.status(500).send(error);
  }
};

module.exports = getUserInfoFromdb;
