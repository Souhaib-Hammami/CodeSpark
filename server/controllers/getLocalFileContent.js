const fs = require("fs");
const path = require("path");

const getLocalFileContent = async (req, res) => {
  try {
    const userInputPath = req.body.filepath; // kif el lien hedha "users_files/createdBy_1/renameMe(2).js"

    if (!userInputPath) {
      return res.status(400).json({ error: "Missing 'filepath' in request body" });
    }

    const baseDir = path.resolve(__dirname, "../users_files");
    const requestedPath = path.resolve(__dirname, "..", userInputPath);

    if (!requestedPath.startsWith(baseDir)) {
      return res.status(403).json({ error: "Access denied" });
    }

    if (!fs.existsSync(requestedPath)) {
      return res.status(404).json({ error: "File does not exist" });
    }

    const content = fs.readFileSync(requestedPath, "utf8");

    res.send(content);
  } catch (error) {
    console.error("Error reading file:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

module.exports = getLocalFileContent;