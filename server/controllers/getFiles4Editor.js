
//const fs=require('fs') 8alta yelzem promises
// fs (callback version) 

// fs.promises (promise/async version) 

const fs=require('fs').promises
const path = require('path');

// const getFiles4Editor =(userId)=>{

// directoryPath=path.join(__dirname, '..', 'users_files', `createdBy_${userId}`);


//       const files = fs.readdirSync(directoryPath);
//         files.forEach(file => {
//                     console.log(file);
//                 });
//         return files
// }
// module.exports=getFiles4Editor



// const directoryPath = '../users_files/createdBy_1'; 
//getFiles4Editor("1")



const getFiles4Editor = async (req, res) => {
    const { userId } = req.body; 

    // :     ../users_files/createdBy_<userId>
    const directoryPath = path.join(__dirname, '..', 'users_files', `createdBy_${userId}`);

    try {
        const files = await fs.readdir(directoryPath);

        files.forEach(file => {
            console.log(file);
        });

        res.status(200).json( files );  // array idha ken t7eb boject ({ files })

    } catch (error) {
        console.error("Error reading user files:", error.message);
        res.status(500).json({ error: 'Could not read user files' });
    }
};

module.exports = getFiles4Editor;