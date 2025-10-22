require('dotenv').config();
const path = require('path');

const express=require('express')

const port=process.env.port_api

const app=express()
app.use(express.json())
app.listen(port,()=>console.log('API server Opened on port : '+ port ))

const cors=require('cors')
app.use(cors())

app.use("/users_files",express.static(path.join(__dirname, 'users_files')))

const allGroupsE=require('./routes/editor')
app.use("/",allGroupsE)

const getFiles4Editor=require('./routes/getFiles4Editor')
app.use("/",getFiles4Editor)


const allGroups=require('./routes/groups')
app.use("/",allGroups)

const createGroup=require('./routes/groups')
app.use("/",createGroup)

const newfile=require('./routes/newfile')
app.use("/",newfile)


const loginRouter=require('./routes/users')
app.use("/",loginRouter);


const deleteFile=require('./routes/deleteFile')
app.use("/",deleteFile);

const searchGroup=require('./routes/searchGroup')
app.use("/",searchGroup);

const joinGrp=require('./routes/joinGrp')
app.use("/",joinGrp);

const joinedGrp=require('./routes/joinedGrp')
app.use("/",joinedGrp);


const sharedFiles=require('./routes/shareFiles')
app.use("/",sharedFiles);



const getFile_4Groups=require('./routes/getFile_4Groups')
app.use("/",getFile_4Groups);



const getLetterProfile=require('./routes/getLetterProfile')
app.use("/",getLetterProfile);



const getFileContent=require('./routes/getFileContent')
app.use("/",getFileContent);



const getLocalFileContent=require('./routes/getLocalFileContent')
app.use("/",getLocalFileContent);



const renameFile=require('./routes/renameFile')
app.use("/",renameFile);


const saveFile=require('./routes/saveFile')
app.use("/",saveFile);

const getUserInfoFromdb=require('./routes/getUserInfoFromdb')
app.use("/",getUserInfoFromdb);

const TestConection =require('./postgresql/TestConection')
TestConection()


const { pgconnection, users, groups, files, groups_members } = require('./models/index');
const createGroups = require('./controllers/createGroup');

// sequelize.sync()	Synchronizes models to DB: creates tables if missing
// force: true	Drops and recreates all tables
// alter: true	Updates existing tables to match model changes (it there is table it make a new )



const synchronizeTables =async () => {
    try {
        pgconnection.sync({ alter: true })
        console.log("alter the existing tables to match your models without data loss")
    } catch (error) {
        console.log(error)
    }
    
}


synchronizeTables()

module.exports={users,groups,groups_members,files}