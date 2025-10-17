const groups =(connection,DataTypes)=>{

const Groups=connection.define(
  
    "groups", 
    {
            name: {
            type: DataTypes.STRING(100),
            allowNull: false
                   },
            description: {
            type: DataTypes.TEXT,
            allowNull: true,
            defaultValue: ''
            },
            owner_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            onDelete: 'CASCADE'
            }
     }



)



return Groups

}


module.exports=groups