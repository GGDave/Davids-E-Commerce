const { Model, DataTypes } = require('sequelize');

const sequelize = require('../config/connection.js');

class Category extends Model {}

Category.init(
  {  // in the following section we define the schema for the category table.
    // define columns
    id: {
			type: DataTypes.INTEGER,  // indicates the id column to be a type of integer
			allowNull: false,// this states that the id field cannot be empty when creating
			primaryKey: true,// this designates the id field as the primary key for the category table
			autoIncrement: true,// this states that the id will automatically increase by 1
		},
		category_name: {
			type: DataTypes.STRING,// this line states that the category name column in the category
			//is a type of string 
			allowNull: false,// this states that the id field cannot be empty when creating 
			validate: {//lastly this section of code will validate that the category name field can only
				//contain alphanumeric characters when creating or updating records.
				isAlphanumeric: true,
			},
		},
  },
  {
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: 'category',
  }
);

module.exports = Category;
