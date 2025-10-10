// const mkdir = require('../utils/mkdir');

// function mkdirc(req, res) {
//   const { userId } = req.body;

//   if (!userId) {
//     return res.status(400).json({ error: 'userId is required' });
//   }

//   mkdir(userId.toString());

//   res.json({ message: `Folder created for user ${userId}` });
// }

// module.exports = mkdirc


const fs = require('fs').promises;
const path = require('path');

const newfile = async (req, res) => {
  const { user_id, filename, content = '' } = req.body;

  if (!user_id || !filename) {
    return res.status(400).json({ message: 'user_id and filename are required.' });
  }

  // Path: /uploads/uploadedBy_<user_id>
  const userDir = path.join(__dirname, '..', 'users_files', `createdBy_${user_id}`);

  try {
    // Ensure directory exists
    await fs.mkdir(userDir, { recursive: true });

    // Create the full file path
    const filePath = path.join(userDir, filename);

    // Write the content to the file
    await fs.writeFile(filePath, content, 'utf8');

    console.log(`File created at: ${filePath}`);

    res.status(200).json({
      message: `File "${filename}" created successfully for user ${user_id}.`,
      path: filePath,
    });
  } catch (err) {
    console.error('Error creating file:', err);
    res.status(500).json({ message: 'Failed to create file.', error: err.message });
  }
};

module.exports = newfile;
