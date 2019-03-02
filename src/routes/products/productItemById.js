const allProducts = require("../../db/products/all-products.json");
const url = require("url");

const findProduct = (arr, id) => {
  return arr.find(el => String(el.id) === id);
}

debugger

const getQueryId = url => {
  const indexOf = url.pathname.lastIndexOf("/");

  if(indexOf !== -1){
    const idString = url.pathname.slice(indexOf + 1).trim();

    return idString;
  }

  return url;
}

const productsItemsByIdsRoute = (request, response) => {
  const parseUrl = url.parse(request.url);
  const id = getQueryId(parseUrl);
  const product = findProduct(allProducts, id);

  if(product) {

    const { id, sku, name, description } = product;
    const newProduct = { id, sku, name, description }

    const responseBody = {
      status: "success",
      product: newProduct
    };

    response.write(JSON.stringify(responseBody));
    response.end();
  } else {

    const responseBody = {
      status: "no products",
      product: []
    };

    response.write(JSON.stringify(responseBody));
    response.end();
  }
}

module.exports = productsItemsByIdsRoute;