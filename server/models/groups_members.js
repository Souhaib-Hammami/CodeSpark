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
      type: DataTypes.INTEGER,
      allowNull: false,
    
      onDelete: 'CASCADE'
    },
    group_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      // primaryKey: true,
      onDelete: 'CASCADE'
    },
    group_name: {
  type: DataTypes.STRING,
  allowNull: false
},
    role: {
      type: DataTypes.ENUM('owner', 'admin', 'editor', 'viewer'),
      allowNull: false,
      defaultValue: 'viewer',
      comment: 'owner: full control, admin: manage members, editor: edit files, viewer: read-only'
    }
  });

  return GroupsMembers;
};

module.exports = groups_members;