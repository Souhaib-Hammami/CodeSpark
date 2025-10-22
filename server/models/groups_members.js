// models/groupMembers.js

const groups_members = (connection, DataTypes) => {
  const GroupsMembers = connection.define(
    "groups_members", {
      id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    user_id: {
      // type: DataTypes.INTEGER,
      // allowNull: false,
      // onDelete: 'CASCADE'
      type: DataTypes.INTEGER, 
      allowNull: false, 
      references: { model: "users", key: "id" }, 
      onDelete: "CASCADE", 
      onUpdate: "CASCADE"
    },
    group_id: {
      // type: DataTypes.INTEGER,
      // allowNull: false,
      // // primaryKey: true,
      // onDelete: 'CASCADE'

type: DataTypes.INTEGER,
  allowNull: false,
  references: { model: "groups", key: "id" },
  onDelete: "CASCADE",
  onUpdate: "CASCADE"
    },
    group_name: {
  type: DataTypes.STRING,
  allowNull: false
},


role: {
        type: DataTypes.ENUM({
          values: ['owner', 'admin', 'editor', 'viewer'],
        }),
        allowNull: false,
        defaultValue: 'viewer',
        // 3amlletni mochkel manajem n6adem el bEND sequilize-postgresql ken bel "force" 
        // comment: 'owner: full control, admin: manage members, editor: edit files, viewer: read-only'
      }
  


  });
  return GroupsMembers;
};

module.exports = groups_members;