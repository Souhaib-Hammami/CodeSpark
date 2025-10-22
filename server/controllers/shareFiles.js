// controllers/shareFileController.js
const { files } = require('../models');

const shareFile = async (req, res) => {
  try {
    const { userId, selectedFile, groupIds } = req.body;

    // create a new record for each group
    //The Promise.all  for handling multiple asynchronous operations simultaneously.
    const sharedFiles = await Promise.all(groupIds.map(group_id => {
      return files.create({
        group_id,
        uploader_id: userId,
        filename: selectedFile,
        filepath: `/users_files/createdBy_${userId}/${selectedFile}`
      });
    }));

    return res.status(200).json({
      message: 'File shared successfully',
      sharedFiles
    });
  } catch (error) {
    console.error('Error sharing file:', error);
    res.status(500).json({ message: 'Error sharing file', error: error.message });
  }
};

module.exports = shareFile;
