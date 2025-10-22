
////////// no an atomic concept just delete files no more synchronize with database//

// const fs = require('fs').promises
// const path = require('path');

// const deleteFile = async (req, res) => {
//   const { user_id, filename } = req.query;

//   if (!user_id || !filename) {
//     return res.status(400).json({ error: 'user_id and filename are required' });
//   }

//   const userDir = path.join(__dirname, '..', 'users_files', `createdBy_${user_id}`);
//   const filePath = path.join(userDir, filename);

//   try {
//     // Check if the file exists
//     await fs.access(filePath);

//     // Delete the file
//     await fs.unlink(filePath);

//     console.log(`Deleted file: ${filePath}`);
//     return res.status(200).json({ message: 'File deleted successfully' });

//   } catch (error) {
//     console.error(`Failed to delete file: ${error.message}`);
//     return res.status(500).json({ error: 'Failed to delete file', details: error.message });
//   }
// };

        
// module.exports=deleteFile


////the cool thing : implement an atomic deletion workflow, ensuring that when a file is deleted from local storage, its corresponding record in the files table is also removed ///

const { QueryTypes } = require('sequelize');
const fs = require('fs').promises;
const path = require('path');
const { pgconnection } = require('../models/');

const deleteFile = async (req, res) => {
  const { user_id, filename } = req.query;

  // Validate input
  if (!user_id || !filename) {
    return res.status(400).json({ error: 'user_id and filename are required' });
  }

  const userId = Number(user_id);
  if (isNaN(userId)) {
    return res.status(400).json({ error: 'Invalid user_id' });
  }

  // Sanitize filename to prevent path traversal
  const sanitizedFilename = path.basename(filename);
  const userDir = path.join(__dirname, '..', 'users_files', `createdBy_${userId}`);
  const filePath = path.join(userDir, sanitizedFilename);

  try {
    // Start a transaction for database operations
    const result = await pgconnection.transaction(async (transaction) => {
      // 1. Find all file records in the database for this filename and uploader_id
      const fileRecords = await pgconnection.query(
        'SELECT id, group_id, uploader_id FROM files WHERE filename = :filename AND uploader_id = :userId',
        {
          replacements: { filename: sanitizedFilename, userId },
          type: QueryTypes.SELECT,
          transaction,
        }
      );

      // 2. Verify permissions for each file record
      if (fileRecords.length) {
        for (const file of fileRecords) {
          if (file.uploader_id !== userId) {
            const groupMember = await pgconnection.query(
              'SELECT role FROM groups_members WHERE user_id = :userId AND group_id = :groupId',
              {
                replacements: { userId, groupId: file.group_id },
                type: QueryTypes.SELECT,
                transaction,
              }
            );

            if (!groupMember.length || !['admin', 'owner'].includes(groupMember[0].role)) {
              throw new Error(
                `Unauthorized: Only the uploader or group admin/owner can delete this file in group ${file.group_id}`
              );
            }
          }
        }
      } else {
        console.warn(`No database records found for file: ${sanitizedFilename}, user_id: ${userId}`);
      }

      // 3. Check if the file exists on disk
      let fileExists = false;
      try {
        await fs.access(filePath);
        fileExists = true;
      } catch (error) {
        console.warn(`File not found on disk: ${filePath}`);
      }

      // 4. Delete the file from local storage if it exists
      if (fileExists) {
        try {
          await fs.unlink(filePath);
          console.log(`Deleted file from disk: ${filePath}`);
        } catch (error) {
          if (error.code !== 'ENOENT') {
            throw error; // Rethrow if error is not "file not found"
          }
        }
      }

      // 5. Delete all matching file records from the database
      if (fileRecords.length) {
        const fileIds = fileRecords.map((file) => file.id);
        await pgconnection.query(
          'DELETE FROM files WHERE id IN (:fileIds)',
          {
            replacements: { fileIds },
            type: QueryTypes.DELETE,
            transaction,
          }
        );
        console.log(`Deleted ${fileRecords.length} file records from database`);
      }

      return {
        message: fileExists || fileRecords.length ? 'File deleted successfully from all groups' : 'File not found, no action taken',
      };
    });

    // Return success response
    return res.status(200).json(result);
  } catch (error) {
    console.error(`Failed to delete file: ${error.message}`);
    if (error.message.includes('Unauthorized')) {
      return res.status(403).json({ error: error.message });
    }
    if (error.message.includes('not found')) {
      return res.status(404).json({ error: error.message });
    }
    return res.status(500).json({ error: 'Failed to delete file', details: error.message });
  }
};

module.exports = deleteFile;