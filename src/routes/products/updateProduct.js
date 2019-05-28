const Product = require('../../modules/db/shemas/productSchema');

const updateProduct = (request, response) => {
  const propertyToUpdate = request.body;
  const id = request.params.id;


  const sendError = (err) => {
    response.status(400);
    response.json({
      status: 'error',
      info: `there's no such product`,
      error: err.stack
    });
  };

  const sendResponse = (newProduct) => {
    if(!newProduct) {
      return sendError();
    }

    response.status(200);
    response.json({
      status: 'success',
      product: newProduct
    });
  };

  Product
    .findOneAndUpdate(
      { _id: id },
      { $set: propertyToUpdate },
      { new: true }
    )
    .then(sendResponse)
    .catch(sendError)

};

module.exports = updateProduct;
