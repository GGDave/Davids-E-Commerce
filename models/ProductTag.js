const { Model, DataTypes } = require('sequelize');

const sequelize = require('../config/connection');

class ProductTag extends Model {}

ProductTag.init(//in this section of code we define the schema for the productTag table 
  {
    // define columns
    id: {
			type: DataTypes.INTEGER,// indicates the id column to be a type of integer
			allowNull: false,// this states that the id field cannot be empty when creating
			primaryKey: true,// this designates the id field as the primary key for the category table
			autoIncrement: true,// this states that the id will automatically increase by 1
		},
		product_id: {
			type: DataTypes.INTEGER,// indicates the id column to be a type of integer
			references: {//here we set up a relationship between this table and products table
				model: 'product',
				key: 'id',
			},
		},
		tag_id: {
			type: DataTypes.INTEGER,// indicates the id column to be a type of integer
			references: {//here we set up a relationship between this table and tag's table
				model: 'tag',
				key: 'id',
			},
		},
  },
  {
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: 'product_tag',
  }
);

module.exports = ProductTag;
