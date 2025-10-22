const { groups_members } = require('../models');

const joinedGrp = async (req, res) => {
  try {
    const userId = Number(req.params.userId); 
    if (!userId) return res.status(400).json({ message: "Invalid userId" });

    console.log("User ID:", userId);

    const joined = await groups_members.findAll({
      where: { user_id: userId }
    });
    console.log(joined)
    return res.status(200).json({
      message: "Groups fetched successfully",
      joined
    });
  } catch (error) {
    console.error("Error fetching groups:", error);
    return res.status(500).json({
      message: "Error fetching groups",
      error: error.message
    });
  }
};

module.exports = joinedGrp;
