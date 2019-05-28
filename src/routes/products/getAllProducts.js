const Product = require('./../../modules/db/shemas/productSchema');

const getAllProducts = (request, response) => {

  const sendResponse = (products) => {
    response.status(200);
    response.json(products);
  }

  const sendError = (error) => {
    response.status(400),
    response.json({
      status: "failed to get documents",
      error: error.stack
    })
  }

  Product.find()
    .then(sendResponse)
    .catch(sendError);
};

module.exports = getAllProducts;
