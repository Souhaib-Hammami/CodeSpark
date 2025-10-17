require('dotenv').config();

const express=require('express')

const port=process.env.port_api

const app=express()
app.use(express.json())
app.listen(port,()=>console.log('API server Opened on port : '+ port ))

const cors=require('cors')
app.use(cors())


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




const TestConection =require('./postgresql/TestConection')
TestConection()


const { pgconnection, users, groups, files, groups_members } = require('./models/index');
const createGroups = require('./controllers/createGroup');

// sequelize.sync()	Synchronizes models to DB: creates tables if missing
// force: true	Drops and recreates all tables
// alter: true	Updates existing tables to match model changes (it there is table it make a new )



const synchronizeTables =async () => {
    try {
        pgconnection.sync({ force: true })
        console.log("alter the existing tables to match your models without data loss")
    } catch (error) {
        console.log(error)
    }
    
}


synchronizeTables()

module.exports={users,groups,groups_members,files}