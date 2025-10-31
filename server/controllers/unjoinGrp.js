const { groups_members } = require('../models/index');



const unjoinGrp = async (req, res) => {
  const { groupId, userId } = req.body;

  console.log("Unjoin request:", { groupId, userId });

  try {
    // Check if membership exists
    const member = await groups_members.findOne({
      where: {
        user_id: userId,
        group_id: groupId
      }
    });

    if (!member) {
      return res.status(404).json({ message: "User is not a member of this group" });
    }

    // Delete the membership
    await member.destroy();

    return res.status(200).json({
      message: "Successfully left the group",
      data: { group_id: groupId, user_id: userId }
    });

  } catch (error) {
    console.error("Error leaving group:", error);
    return res.status(500).json({
      message: "Error leaving the group",
      error: error.message
    });
  }
};

module.exports = unjoinGrp;
