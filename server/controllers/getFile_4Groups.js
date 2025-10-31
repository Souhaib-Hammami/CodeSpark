const { QueryTypes } = require('sequelize');
const {pgconnection} = require('../models/')
 
const getFile_4Groups=async(req,res)=>{

  try {
    const userId = Number(req.params.userId); 
    if (!userId) return res.status(400).json({ message: "Invalid userId" });

    console.log("User ID:", userId);

const results = await pgconnection.query
// ('SELECT * from groups LEFT JOIN files ON groups.id=files.group_id',
(
      `
      SELECT DISTINCT groups.id,
             groups.name,
             groups.description,
             groups.owner_id,
             files.filename,
             files.id AS file_id,
             files.filepath,
             files.uploader_id
      FROM groups
      LEFT JOIN files ON groups.id = files.group_id
      LEFT JOIN groups_members ON groups.id = groups_members.group_id
      WHERE groups.owner_id = ? OR groups_members.user_id = ?
      ORDER BY groups.id DESC
      `,
        {
        replacements:[userId,userId],
        type: QueryTypes.SELECT,
        }
);

    return res.status(200).json
    ({
      message: "Groups and their files fetched successfully",data: results
    });

}
  catch (error) {
    console.error("Error fetching groups and their files:", error);
    return res.status(500).json({
      message: "Error fetching groups and their files",
      error: error.message
    });
  }

}
module.exports=getFile_4Groups