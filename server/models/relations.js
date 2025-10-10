function ApplyRelation(users, groups, groups_members, files) {


//1 M 
users.hasMany(groups, { foreignKey: 'owner_id',onDelete: 'CASCADE'});
groups.belongsTo(users, { foreignKey: 'owner_id'}); 


//M M via groups_members a junction table 
//(ken t7eb Sequelize automatically create junction table  :through: 'groups_members' // just a string name )
users.belongsToMany(groups, { through: groups_members,foreignKey:'user_id', otherKey: 'group_id'});
//(ken theb auto junction table : through: 'groups_members' // just a string name )
groups.belongsToMany(users, { through: groups_members,foreignKey: 'group_id',otherKey: 'user_id'});

//1 M
groups.hasMany(files, { foreignKey: 'group_id',onDelete:'CASCADE'});
files.belongsTo(groups, { foreignKey: 'group_id'});

// 1 M
users.hasMany(files, { foreignKey: 'uploader_id',onDelete: 'SET NULL'});
files.belongsTo(users, {foreignKey: 'uploader_id'});
}

module.exports=ApplyRelation

