const { Model, DataTypes } = require('sequelize');

const sequelize = require('../config/connection.js');

class Tag extends Model {}

Tag.init(//in this section of code we define the schema for tag table
  {
    // define columns
    id: {
			type: DataTypes.INTEGER,// indicates the id column to be a type of integer
			allowNull: false,// this states that the id field cannot be empty when creating
			primaryKey: true,// this designates the id field as the primary key for the category table
			autoIncrement: true,// this states that the id will automatically increase by 1
		},
		tag_name: {
			type: DataTypes.STRING,// this line states that the category name column in the category
			//is a type of string
		},
  },
  {
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: 'tag',
  }
);

module.exports = Tag;
