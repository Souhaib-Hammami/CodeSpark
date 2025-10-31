const { groups_members, groups } = require('../models');

const joinedGrp = async (req, res) => {
  try {
    const userId = Number(req.params.userId);
    if (!userId) return res.status(400).json({ message: "Invalid userId" });

    console.log("User ID:", userId);

    const joined_from_others_groups_raw = await groups_members.findAll({
      where: {
        user_id: userId,
        role: ['editor', 'viewer'],
      },
    });

    const join_your_groups_raw = await groups.findAll({
      where: {
        owner_id: userId,
      },
    });

    const joined_from_others_groups = joined_from_others_groups_raw.map(g => ({
      group_id: g.group_id,
      group_name: g.group_name,
      group_description: g.description,
      createdAt: g.createdAt,
      role: g.role,
    }));

    const join_your_groups = join_your_groups_raw.map(g => ({
      group_id: g.id,
      group_name: g.name, // name -> group_name
    }));

    return res.status(200).json({
      message: "Groups fetched successfully",
      joined_from_others_groups,
      join_your_groups,
    });
  } catch (error) {
    console.error("Error fetching groups:", error);
    return res.status(500).json({
      message: "Error fetching groups",
      error: error.message,
    });
  }
};

module.exports = joinedGrp;
