const users=(connection,DataTypes)=>{

 const Users=connection.define(

    "users", 

        {
        username:{
            type:DataTypes.STRING,
            allowNull : false,
            unique: true
        },


        email:{
            type:DataTypes.STRING,
            allowNull:false,
            unique: true
        },


        password_hash :{
        type:DataTypes.STRING,
        allowNull : false

        },


        bio:{
            type:DataTypes.STRING,
            allowNull:true,
            unique: false
        }

    })

        return Users   
    }
module.exports=users

