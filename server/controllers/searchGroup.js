// const groups=require('../models/index')
// 8altaaa
// requiring the model function but not calling it with the Sequelize connection and DataTypes
//  ====> result : via postman 9alli : 
// {
//     "success": false,
//     "message": "Error searching groups",
//     "error": "groups.findAll is not a function"
// }

const {groups}=require('../models/index')
const { Op } = require('sequelize');

const searchGroup=async (req,res) => {
    
try {
     const { query } = req.query;

     if (!query || query.trim() === '') {
      return res.status(400).json({
        success: false,
        message: 'Search query is required'
      });
      }

     const groupsM = await groups.findAll({
      where: {
        [Op.or]: 
        [
                {
                           name: {
                           [Op.iLike]: `%${query}%` 
                                    }
                },
                {
                            description: {
                            [Op.iLike]: `%${query}%`
                                    }
                }
        ]
      },
      order: [['createdAt', 'DESC']],
        // No limit here if limit ekteb : limit: 50
     });

     res.status(200).json({
      success: true,
      count: groupsM.length,
      data: groupsM
     });

    } 
    /*////////////////////////*/
// const searchTerm = `%${query}%`;

//     const [results, metadata] = await sequelize.query(
//       `
//       SELECT * FROM "groups"
//       WHERE 
//         "name" ILIKE :searchTerm OR
//         "description" ILIKE :searchTerm
//       ORDER BY "createdAt" DESC
//       LIMIT 50
//       `,
//       {
//         replacements: { searchTerm },
//         type: sequelize.QueryTypes.SELECT
//       }
//     );

//     res.status(200).json({
//       success: true,
//       count: results.length,
//       data: results
//     });
////////////////////////

  catch (error) {
    console.error('Search groups error:', error);
    res.status(500).json({
      success: false,
      message: 'Error searching groups',
      error: error.message
    });
  }
}

module.exports=searchGroup