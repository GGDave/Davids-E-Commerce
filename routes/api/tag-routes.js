const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');

// The `/api/tags` endpoint

router.get('/', (req, res) => {
  // find all tags
  // be sure to include its associated Product data
  Tag.findAll({//in this line of code we use 'find all' to call information from the tag table.
		include: [
			{//this will specify that fetching tag table will also include associated information from the two paramaters below
				model: Product,
				through: ProductTag,
			},
		],
	})
		.then((tags) => res.status(200).json(tags)) // here we have a promise chain that will be executed if the query is successfull
		// and the information will be sent to the client as json with a status code of 200
		.catch((err) => res.status(500).json(err))//if the query fails an error message will be returned to the 
		//client as json along with a status code of 500
});

router.get('/:id', (req, res) => {
  // find a single tag by its `id`
  // be sure to include its associated Product data
  Tag.findOne({
		where: {//this line of code will allow us to retrieve information that matches the value of ID re.params.id
			id: req.params.id,
		},
		include: [
			{//this will specify that fetching tag table will also include associated information from the two paramaters below
				model: Product,
				through: ProductTag,
			},
		],
	})
		.then((tag) => res.status(200).json(tag))// here we have a promise chain that will be executed if the query is successfull
		// and the information will be sent to the client as json with a status code of 200
		.catch((err) => res.status(400).json(err))// if an error occurs this line will be sent to the client.
		//400 error code will result in a "bad request" response
});

router.post('/', (req, res) => {
  // create a new tag
  Tag.create(req.body)
		.then((tag) => res.status(200).json(tag))// here we have a promise chain that will be executed if the query is successfull
		// and the information will be sent to the client as json with a status code of 200
		.catch((err) => res.status(400).json(err))// if an error occurs this line will be sent to the client.
		//400 error code will result in a "bad request" response
});

router.put('/:id', (req, res) => {
  // update a tag's name by its `id` value
  Tag.update(req.body, {
		where: {
			id: req.params.id,
		},
	})
		.then((tag) => res.status(200).json(tag))// here we have a promise chain that will be executed if the query is successfull
		// and the information will be sent to the client as json with a status code of 200
		.catch((err) => res.status(400).json(err))// if an error occurs this line will be sent to the client.
		//400 error code will result in a "bad request" response
});

router.delete('/:id', (req, res) => {
  // delete on tag by its `id` value
  Tag.destroy({
		where: {
			id: req.params.id,//this line of code will allow us to delete information that matches the value of ID re.params.id
		},
	})
		.then((tag) => res.status(200).json(tag))// here we have a promise chain that will be executed if the query is successfull
		// and the information will be sent to the client as json with a status code of 200
		.catch((err) => res.status(400).json(err))// if an error occurs this line will be sent to the client.
		//400 error code will result in a "bad request" response
});

module.exports = router;
