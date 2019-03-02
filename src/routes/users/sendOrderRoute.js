const path = require('path');
const fs = require('fs');
const uuidv4 = require('uuid/v4');

const allProducts = require('../../db/products/all-products.json');

const saveOrder = data => {
  dataObj = JSON.stringify(data);

  if(!fs.existsSync("src/db/users/orders")) {
    fs.mkdir("src/db/users/orders", err => {
      if(err) console.log(err);
    });
  }

  const src = path.resolve(
    __dirname,
    "../../",
    "db/users/orders",
    "orders.json"
  )

  fs.writeFile(src, dataObj, err => {
    if(err){
      console.log(err);
    }
  });
}

const getProductsfromString = productsString => {
  const arrOfProducts = productsString.split(",");
  return arrOfProducts;
}

const getProducts = products => {
  return allProducts.filter(product => {
    return products.find(id => {
      return product.id === +id;
    });
  });
};

const createOrder = (request, response) => {
  const order = request.body;
  const products = getProducts(getProductsfromString(order.products));
  let status = "success";
  let orderData = { id: uuidv4(), ...order };

  if(products.length < 1){
    orderData  = null;
    status = "failed";
  }
  saveOrder(orderData);

  response.status(200);
  response.set("ContentType", "application/json");
  response.json({status: status, order: orderData});
}

module.exports = createOrder;
