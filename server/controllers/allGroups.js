const { users,groups } = require('../models');



const allGroups = async (req, res) => {
  try {
    const userId = req.user.id;
    console.log("User ID:", userId);

    const user = await users.findByPk(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const ownedGroups = await groups.findAll({
      where: { owner_id: userId },
       attributes: ['id', 'name', 'description', 'createdAt', 'updatedAt']
    });

    const memberGroups = await user.getGroups({
      joinTableAttributes: ['role', 'group_name'], 
      // attributes: ['id', 'name', 'description']
    });

    return res.status(200).json({
      message: "Groups fetched successfully",
      ownedGroups,
      memberGroups
    });

  } catch (error) {
    console.error("Error fetching groups:", error);
    return res.status(500).json({
      message: "Error fetching groups",
      error: error.message
    });
  }
};

module.exports = allGroups;
