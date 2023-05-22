const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint

router.get('/', (req, res) => {
  // find all categories
  // be sure to include its associated Products
  Category.findAll({ //in this line of code we use 'find all' to call information from the categories table.
		include: [Product],//we pass in product to include information from the products table that is 
		//associated by the id relationship.
	})
		.then((data) => res.status(200).json(data)) // here we have a promise chain that will be executed if the query is successfull
		// and the information will be sent to the client as json with a status code of 200
		.catch((err) => res.status(500).json(err))//if the query fails an error message will be returned to the 
		//client as json along with a status code of 500
});

router.get('/:id', (req, res) => {
  // find one category by its `id` value
  // be sure to include its associated Products
  Category.findOne({//this line of code will allow us to retrieve information that matches the value of ID re.params.id
		where: {
			id: req.params.id,
		},
		include: [Product],//we pass in product to include information from the products table that is 
		//associated by the id relationship.
	})
		.then((data) => res.status(200).json(data))// here we have a promise chain that will be executed if the query is successfull
		// and the information will be sent to the client as json with a status code of 200
		.catch((err) => res.status(500).json(err))//if the query fails an error message will be returned to the 
		//client as json along with a status code of 500
});

router.post('/', (req, res) => {
  // create a new category
  Category.create(req.body)
		.then((category) => res.status(200).json(category))// here we have a promise chain that will be executed if the query is successfull
		// and the information will be sent to the client as json with a status code of 200
		.catch((err) => res.status(400).json(err))// if an error occurs this line will be sent to the client.
		//400 error code will result in a "bad request" response
});

router.put('/:id', (req, res) => {
  // update a category by its `id` value
  Category.update(req.body, {
		where: {
			id: req.params.id,//this line of code will allow us to update information that matches the value of ID re.params.id
		},
	})
		.then((category) => res.status(200).json(category))// here we have a promise chain that will be executed if the query is successfull
		// and the information will be sent to the client as json with a status code of 200
		.catch((err) => res.status(400).json(err))// if an error occurs this line will be sent to the client.
		//400 error code will result in a "bad request" response
});

router.delete('/:id', (req, res) => {//the following section of code will allow us to delete any information by 
	//using the ID
  // delete a category by its `id` value
  Category.destroy({
		where: {
			id: req.params.id,//this line of code will allow us to delete information that matches the value of ID re.params.id
		},
	})
		.then((category) => res.status(200).json(category))// here we have a promise chain that will be executed if the query is successfull
		// and the information will be sent to the client as json with a status code of 200
		.catch((err) => res.status(400).json(err))// if an error occurs this line will be sent to the client.
		//400 error code will result in a "bad request" response
});

module.exports = router;
