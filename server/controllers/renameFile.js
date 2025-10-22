const path = require("path")
const fs = require('fs')

const  renameFile=async(req, res) => {
  const { user_id, oldName, newName } = req.body;
  if (!user_id || !oldName || !newName) {
    return res.status(400).json({ error: "Missing parameters" });
  }

  const userDir = path.join("users_files", `createdBy_${user_id}`);
  const oldPath = path.join(userDir, oldName);
  const newPath = path.join(userDir, newName);

  if (!fs.existsSync(oldPath)) {
    return res.status(404).json({ error: "File not found" });
  }

  try {
    fs.renameSync(oldPath, newPath); /// aham line
    res.json({ success: true, newName });
  } catch (err) {
    console.error("Error renaming file:", err);
    res.status(500).json({ error: "Rename failed" });
  }
};

module.exports=renameFile