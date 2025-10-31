
// const getFileContent=async(req,res)=>{
//     try 
//     {
//     const path=req.params.path
//     const content = fs.readFileSync(path, "utf8");
//     res.send(content);
//     }

//     catch (error) {
//         console .log(error)
//     }
// }

// module.exports=getFileContent


const fs = require("fs");
const path = require("path");
const { files } = require("../models"); 

const getFileContent = async (req, res) => {
  try {
    const fileId = req.params.id;

    const file = await files.findOne({ where: { id: fileId } });

    if (!file) {
      return res.status(404).json({ error: "File not found in database" });
    }

    const baseDir = path.resolve(__dirname, "../users_files");
    const filePath = path.resolve(__dirname, `..${file.filepath}`); 

    if (!filePath.startsWith(baseDir)) {
      return res.status(403).json({ error: "Access denied" });
    }

    const content = fs.readFileSync(filePath, "utf8");

    res.send(content);
  } catch (error) {
    console.error("Error reading file:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

module.exports = getFileContent;

