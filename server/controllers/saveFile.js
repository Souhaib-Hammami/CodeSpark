const fs = require("fs").promises;
const path = require("path");

const saveFile = async (req, res) => {
  const { user_id, filename, content } = req.body;

  if (!user_id || !filename) {
    return res.status(400).json({ error: "Missing parameters" });
  }

  try {
    const userDir = path.join("users_files", `createdBy_${user_id}`);
    const filePath = path.join(userDir, filename);

    await fs.mkdir(userDir, { recursive: true });

    // Write file
    await fs.writeFile(filePath, content, "utf8");

    res.json({ success: true, message: "File saved successfully" });
  } catch (err) {
    console.error("Error saving file:", err);
    res.status(500).json({ error: "Failed to save file" });
  }
};

module.exports = saveFile;
