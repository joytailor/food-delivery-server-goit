const Product = require('../../modules/db/shemas/productSchema');

const getProductById = (request, response) => {

  const id = request.params.id;

  const sendResponse = (product) => {
    response.status(200);
    response.json({
      status: "success",
      product: product
    });
  };

  const sendError = (error) => {
    response.status(400);
    response.json({
      status: 'such product has not been found',
      error: error.stack
    });
  };

  const findProduct = Product.findById(id);

  findProduct
    .then(sendResponse)
    .catch(sendError);

}

module.exports = getProductById;
