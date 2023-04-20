const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');

// The `/api/tags` endpoint

router.get('/', (req, res) => {
  // find all tags
  Product.findAll()
    .then((dbTagData) => res.json(dbTagData))
    .catch((err) => res.json(err));
  // be sure to include its associated Product data
});

router.get('/:id', (req, res) => {
  // find a single tag by its `id`
  Product.findOne({
    where: {
      id: req.params.id,
    },
    include: [
      {
        model: Product,
        attributes: ['id', 'product_name', 'price', 'stock', 'category_id'],
      },
    ],
  })
    .then((dbTagData) => res.json(dbTagData))
    .catch((err) => res.json(err));
  // be sure to include its associated Product data
});

router.post('/', (req, res) => {
  // create a new tag
  Product.create({
    tag_name: req.body.tag_name,
  })
    .then((dbTagData) => res.json(dbTagData))
    .catch((err) => res.json(err));

});

router.put('/:id', (req, res) => {
  // update a tag's name by its `id` value
  Product.update(req.body, {
    where: {
      id: req.params.id,
    },
  })
    .then((dbTagData) => res.json(dbTagData))
    .catch((err) => res.json(err));

});

router.delete('/:id', (req, res) => {
  // delete on tag by its `id` value
  Product.destroy({
    where: {
      id: req.params.id,
    },
  })
    .then((dbTagData) => res.json(dbTagData))
    .catch((err) => res.json(err));
});

module.exports = router;
