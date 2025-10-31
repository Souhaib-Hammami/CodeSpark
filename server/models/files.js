

const files = (connection, DataTypes) => {
  const Files = connection.define(
    
    "files",
     {
        group_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'groups',
            key: 'id'
        },
        onDelete: 'CASCADE'
        },
        uploader_id: {
        type: DataTypes.INTEGER,
        allowNull: true,
        onDelete: 'SET NULL'
        },
        filename: {
        type: DataTypes.STRING(255),
        allowNull: false
        },
        filepath: {
        type: DataTypes.TEXT,
        allowNull: false
        },
        content: {
        type: DataTypes.TEXT,
        allowNull: true,
        comment: 'Store code content directly in database'
        },
        file_extension: {
        type: DataTypes.STRING(10),
        allowNull: true,
        comment: 'e.g., .js, .css, .html, .py'
        },
        file_size: {
        type: DataTypes.INTEGER,
        allowNull: true,
        comment: 'Size in bytes'
        }
    }

);

    return Files;
};

module.exports = files;