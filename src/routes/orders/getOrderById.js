const Order = require('../../modules/db/shemas/orderShema');

const getOrderByIdRoute = (request, response) => {

  const id = request.params.id;

  const sendResponse = (order) => {
    response.status(200);
    response.json(order);
  };

  const sendError = (error) => {
    response.status(400);
    response.json({
      status: 'such order has not been found',
      error: error.stack
    });
  };

  const findOrder = Order.findById(id);

  findOrder
    .then(sendResponse)
    .catch(sendError);

}

module.exports = getOrderByIdRoute;
