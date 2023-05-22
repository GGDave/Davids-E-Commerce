const router = require('express').Router();
const { Product, Category, Tag, ProductTag } = require('../../models');

// The `/api/products` endpoint

// get all products
router.get('/', (req, res) => {
  // find all products
  // be sure to include its associated Category and Tag data
  Product.findAll({//in this line of code we use 'find all' to call information from the products table.
		include: [
			Category,//this will specify that fetching products table will also include associated information from the category table
			{//additionally tag and product tag will be included in the fetch request
				model: Tag, 
				through: ProductTag,
			},
		],
	})
		.then((products) => res.json(products)) // if succesfull products response will be sent to the client as json data 
		.catch((err) => {console.log(err) // if an error occurs a response of internal server error will be sent in the response body 
      res.status(500).json(err)
		})
});

// get one product
router.get('/:id', (req, res) => {// this function will allow us to retrieve information by ID
  // find a single product by its `id`
  // be sure to include its associated Category and Tag data
  Product.findOne({
		where: {
			id: req.params.id,//this line of code will allow us to retrieve information that matches the value of ID re.params.id
		},
		include: [
			Category,//this will specify that fetching products table will also include associated information from the category table
			{//additionally tag and product tag will be included in the fetch request
				model: Tag,
				through: ProductTag,
			},
		],
	})
		.then((products) => res.json(products))
		.catch((err) => {
			console.log(err)
			res.status(400).json(err)
		})
});

// create new product
router.post('/', (req, res) => {
  /* req.body should look like this...
    {
      product_name: "Basketball",
      price: 200.00,
      stock: 3,
      tagIds: [1, 2, 3, 4]
    }
  */
  Product.create(req.body)
    .then((product) => {
      // if there's product tags, we need to create pairings to bulk create in the ProductTag model
      if (req.body.tagIds.length) {
        const productTagIdArr = req.body.tagIds.map((tag_id) => {
          return {
            product_id: product.id,
            tag_id,
          };
        });
        return ProductTag.bulkCreate(productTagIdArr);
      }
      // if no product tags, just respond
      res.status(200).json(product);
    })
    .then((productTagIds) => res.status(200).json(productTagIds))
    .catch((err) => {
      console.log(err);
      res.status(404).json(err);
    });
});

// update product
router.put('/:id', (req, res) => {
  // update product data
  Product.update(req.body, {
    where: {
      id: req.params.id,
    },
  })
    .then((product) => {
      if (req.body.tagIds && req.body.tagIds.length) {
        
        ProductTag.findAll({
          where: { product_id: req.params.id }
        }).then((productTags) => {
          // create filtered list of new tag_ids
          const productTagIds = productTags.map(({ tag_id }) => tag_id);
          const newProductTags = req.body.tagIds
          .filter((tag_id) => !productTagIds.includes(tag_id))
          .map((tag_id) => {
            return {
              product_id: req.params.id,
              tag_id,
            };
          });

            // figure out which ones to remove
          const productTagsToRemove = productTags
          .filter(({ tag_id }) => !req.body.tagIds.includes(tag_id))
          .map(({ id }) => id);
                  // run both actions
          return Promise.all([
            ProductTag.destroy({ where: { id: productTagsToRemove } }),
            ProductTag.bulkCreate(newProductTags),
          ]);
        });
      }

      return res.json(product);
    })
    .catch((err) => {
      // console.log(err);
      res.status(400).json(err);
    });
});


router.delete('/:id', (req, res) => {//the following section of code will allow us to delete any information by 
	//using the ID
    // delete one product by its `id` value
    Product.destroy({
      where: {
        id: req.params.id,//this line of code will allow us to delete information that matches the value of ID re.params.id
      },
    })
      .then((products) => {//If the deletion is successful, the code will log the number of deleted products to the console.
        console.log(products)
        res.json(products)//this line will send a JSON response with the deleted products information
      })

      .catch((err) => {
        console.log(err)//this line will log the error to the console
        res.status(400).json(err)// will respong with a status code of 400 bad request
      })
  });

module.exports = router;
