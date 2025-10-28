const { groups, groups_members } = require('../models');

const deleteGrp = async (req, res) => {
  const { groupId, ownerId } = req.body;

  console.log("Delete request:", { groupId, ownerId });

  try {
   
    const group = await groups.findByPk(groupId);

    if (!group) {
      return res.status(404).json({ message: "Group not found" });
    }

    if (group.owner_id !== ownerId) {
      return res.status(403).json({ message: "You are not authorized to delete this group" });
    }

    // fasa5 all memberships awel 7aja (to avoid foreign key constraint errors)
    await groups_members.destroy({
      where: { group_id: groupId }
    });

    await group.destroy();

    return res.status(200).json({ message: "Group deleted successfully" });

  } catch (error) {
    console.error("Error deleting group:", error);
    return res.status(500).json({
      message: "Error deleting group",
      error: error.message
    });
  }
};

module.exports = deleteGrp;
