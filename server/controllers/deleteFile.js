const fs = require('fs').promises
const path = require('path');

const deleteFile = async (req, res) => {
  const { user_id, filename } = req.query;

  if (!user_id || !filename) {
    return res.status(400).json({ error: 'user_id and filename are required' });
  }

  const userDir = path.join(__dirname, '..', 'users_files', `createdBy_${user_id}`);
  const filePath = path.join(userDir, filename);

  try {
    // Check if the file exists
    await fs.access(filePath);

    // Delete the file
    await fs.unlink(filePath);

    console.log(`Deleted file: ${filePath}`);
    return res.status(200).json({ message: 'File deleted successfully' });

  } catch (error) {
    console.error(`Failed to delete file: ${error.message}`);
    return res.status(500).json({ error: 'Failed to delete file', details: error.message });
  }
};





        
 

module.exports=deleteFile