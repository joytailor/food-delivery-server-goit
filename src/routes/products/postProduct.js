const Product = require('../../modules/db/shemas/productSchema');

const createProduct = (request, response) => {
  const product = request.body;

  const newProduct = new Product(product);

  const sendResponse = (product) => {
    console.log(product);

    response.json({
      status: "success",
      product: product
    });
  };

  const sendError = (err) => {
    response.status(400);
    response.json({
      status: 'product has not been saved',
      error: err.stack
    })
  }

  newProduct.save()
    .then(sendResponse)
    .catch(sendError)
}

module.exports = createProduct;
