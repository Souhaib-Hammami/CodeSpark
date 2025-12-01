const users = (connection, DataTypes) => {
  const Users = connection.define("users", {
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },

    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        isEmail: true,
      },
    },

    password_hash: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    bio: {
      type: DataTypes.STRING,
      allowNull: true,
    },

    //  Added for password reset feature
    resetToken: {
      type: DataTypes.STRING,
      allowNull: true,
    },

    tokenExpiry: {
      type: DataTypes.DATE,
      allowNull: true,
    },
  },
  {
    tableName: "users",
    timestamps: true,
  });

  return Users;
};

module.exports = users;
