const Order = require('../../modules/db/shemas/orderShema');

const createOrder = (request, response) => {
  const order = request.body;

  const newOrder = new Order(order);

  const sendResponse = (order) => {
    console.log(order);

    response.json({
      status: success,
      order: order
    });
  };

  const sendError = (err) => {
    response.status(400);
    response.json({
      status: 'order has not been saved',
      error: err.stack
    })
  }

  newOrder.save()
    .then(sendResponse)
    .catch(sendError)
}

module.exports = createOrder;
