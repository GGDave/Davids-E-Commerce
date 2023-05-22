// import important parts of sequelize library
const { Model, DataTypes } = require('sequelize');
// import our database connection from config.js
const sequelize = require('../config/connection');

// Initialize Product model (table) by extending off Sequelize's Model class
class Product extends Model {}

// set up fields and rules for Product model
Product.init(//in this section of code we define the schema for the products table.
  {
    // define columns
    id: {
			type: DataTypes.INTEGER,// indicates the id column to be a type of integer
			allowNull: false,// this states that the id field cannot be empty when creating
			primaryKey: true,// this designates the id field as the primary key for the category table
			autoIncrement: true,// this states that the id will automatically increase by 1
		},
		name: { 
			type: DataTypes.STRING,// this line states that the category name column in the category
			//is a type of string
			allowNull: false,// this states that the id field cannot be empty when creating
		},
		description: {
			type: DataTypes.TEXT, //designates that the description column will be a type of txt
			allowNull: false,// this states that the id field cannot be empty when creating 
		},
		price: {
			type: DataTypes.DOUBLE,// this line of code will allow numbers that can have fractional parts. 
			//"double" represents the numbers can be large and be acurate before and after the decimal
			allowNull: false,// this states that the id field cannot be empty when creating
		},
		in_stock: {
			type: DataTypes.INTEGER,// indicates the id column to be a type of integer
			allowNull: false,// this states that the id field cannot be empty when creating
			defaultValue: 0,//this line of code will default to a value of 0 if no value is provided
		},
		category_id: {
			type: DataTypes.INTEGER,// indicates the id column to be a type of integer
			allowNull: false,// this states that the id field cannot be empty when creating
			references: {// this section of code will reference the category table
				model: 'category',
				key: 'id',
			},
		},
  },
  {
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: 'product',
  }
);

module.exports = Product;
